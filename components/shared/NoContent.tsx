import React from "react";
interface IProps {
  icon: React.ReactNode;
  label: string;
  description: string;
}
const NoContent = ({ icon, label, description }: IProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div>{icon}</div>
      <div className="text-2xl font font-semibold text-zinc-700">{label}</div>
      <div>{description}</div>
    </div>
  );
};

export default NoContent;
