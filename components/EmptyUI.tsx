import Image from "next/image";
import React from "react";

export const EmptyUI = ({
  title,
  description,
  image = "/empty.svg"
}: {
  title: string;
  description: string;
  image?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={image} alt="Empty State" width={240} height={240} />
      <div className="flex flex-col gap-y-4 max-w-md mx-auto text-center mt-6">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
