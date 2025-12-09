export default function LessonImage({ image, title }) {
  return (
    <img
      src={image}
      alt={title}
      className="w-full h-auto max-h-[420px] object-cover rounded-xl mb-8"
    />
  );
}
