interface UserMessageProps {
  text: string;
}

function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="flex justify-end mt-5">
      <div className="px-4 py-3 rounded-lg max-w-2xl bg-accent text-white">
        <p className="text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

export default UserMessage;