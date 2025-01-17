import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { toast } from 'react-hot-toast';

const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 12 }, (_, i) => (currentYear + i - 2).toString());

const memberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  yearOfJoining: z.string().refine(val => yearRange.includes(val), 'Invalid year'),
  domain: z.enum(['Coding', 'Robotics', 'Aeromodelling', 'Media'], {
    errorMap: () => ({ message: 'Please select a valid domain' })
  }),
  usn: z.string().min(10, 'USN must be at least 10 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').or(z.literal('')),
  githubUrl: z.string().url('Invalid GitHub URL').or(z.literal('')),
  socialMediaUrl: z.string().url('Invalid social media URL').or(z.literal('')),
  profilePhoto: z.any()
    .refine((files) => files?.length === 1, 'Profile photo is required')
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      'Max file size is 5MB'
    )
});

function AddMember() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(memberSchema)
  });

  const generateUniqueId = async (yearOfJoining, domain) => {
    const domainCodes = {
      Coding: 'CO',
      Robotics: 'RO',
      Aeromodelling: 'AM',
      Media: 'ME'
    };

    const yearCode = yearOfJoining.slice(-2);
    const domainCode = domainCodes[domain];
    
    // Get the last used number for this domain and year
    const q = query(
      collection(db, 'teamMembers'),
      where('yearOfJoining', '==', yearOfJoining),
      where('domain', '==', domain),
      orderBy('uniqueId', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    let lastNumber = 0;

    if (!querySnapshot.empty) {
      const lastId = querySnapshot.docs[0].data().uniqueId;
      lastNumber = parseInt(lastId.slice(-3));
    }

    const newNumber = (lastNumber + 1).toString().padStart(3, '0');
    return `CH${yearCode}${domainCode}${newNumber}`;
  };

  const onSubmit = async (data) => {
    try {
      // Upload profile photo
      const file = data.profilePhoto[0];
      const storageRef = ref(storage, `profile-photos/${file.name}`);
      await uploadBytes(storageRef, file);
      const photoUrl = await getDownloadURL(storageRef);

      // Generate unique ID
      const uniqueId = await generateUniqueId(data.yearOfJoining, data.domain);

      // Add member to database
      await addDoc(collection(db, 'teamMembers'), {
        ...data,
        profilePhoto: photoUrl,
        uniqueId,
        createdAt: new Date()
      });

      toast.success('Member added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error('Failed to add member. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-600 mb-8 text-center">Add New Member</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="input-field"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="yearOfJoining" className="block text-sm font-medium text-gray-700">Year of Joining</label>
            <select
              id="yearOfJoining"
              {...register('yearOfJoining')}
              className="input-field"
            >
              <option value="">Select year</option>
              {yearRange.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.yearOfJoining && (
              <p className="mt-1 text-sm text-red-600">{errors.yearOfJoining.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">Domain</label>
            <select
              id="domain"
              {...register('domain')}
              className="input-field"
            >
              <option value="">Select domain</option>
              <option value="Coding">Coding</option>
              <option value="Robotics">Robotics</option>
              <option value="Aeromodelling">Aeromodelling</option>
              <option value="Media">Media</option>
            </select>
            {errors.domain && (
              <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN</label>
            <input
              type="text"
              id="usn"
              {...register('usn')}
              className="input-field"
            />
            {errors.usn && (
              <p className="mt-1 text-sm text-red-600">{errors.usn.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              {...register('dateOfBirth')}
              className="input-field"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              {...register('profilePhoto')}
              className="input-field"
            />
            {errors.profilePhoto && (
              <p className="mt-1 text-sm text-red-600">{errors.profilePhoto.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL (Optional)</label>
            <input
              type="url"
              id="linkedinUrl"
              {...register('linkedinUrl')}
              className="input-field"
            />
            {errors.linkedinUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">GitHub URL (Optional)</label>
            <input
              type="url"
              id="githubUrl"
              {...register('githubUrl')}
              className="input-field"
            />
            {errors.githubUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.githubUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="socialMediaUrl" className="block text-sm font-medium text-gray-700">Social Media URL (Optional)</label>
            <input
              type="url"
              id="socialMediaUrl"
              {...register('socialMediaUrl')}
              className="input-field"
            />
            {errors.socialMediaUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.socialMediaUrl.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? 'Adding Member...' : 'Add Member'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;