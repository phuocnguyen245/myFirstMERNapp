import mongoose from 'mongoose';
async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE as string);
    console.log('connect successfully');
  } catch (error) {
    console.log('error connecting');
  }
}
export default { connect };
