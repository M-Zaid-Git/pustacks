import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't return password by default
    },
    profileImage: {
      type: String,
      default: '', // Default profile image URL can be set here
    },
    role: {
      type: String,
      enum: ['student', 'professor', 'admin'],
      default: 'student',
    },
    bio: {
      type: String,
      default: '',
      maxlength: [200, 'Bio cannot be more than 200 characters'],
    },
    institution: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: '',
    },
    yearOfStudy: {
      type: Number,
      default: null,
    },
    socialLinks: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
      },
    ],
    uploads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
      },
    ],
    downloads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash password with salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if entered password matches the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate user avatar using initials and color based on name
userSchema.methods.getInitialsAvatar = function () {
  if (this.profileImage) {
    return this.profileImage; // Return existing image if available
  }

  // Extract initials (max 2 characters)
  const initials = this.name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on name
  const colors = [
    '#8B5CF6', // Purple
    '#3B82F6', // Blue
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
  ];

  // Simple hash function for name to pick a color
  const colorIndex = this.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  const color = colors[colorIndex];

  // Create a data URL for an SVG with the initials
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${color}" />
      <text x="50" y="50" font-family="Montserrat, sans-serif" font-size="40" 
        font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">
        ${initials}
      </text>
    </svg>
  `;

  const dataURL = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return dataURL;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
