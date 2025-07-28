'use client'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface RedirectToSlugProps {
  slug: string;
  open: boolean;
  onClose: () => void;
  closeDialog: () => void;
}

const RedirectToSlug: React.FC<RedirectToSlugProps> = ({ slug, open, onClose, closeDialog }) => {
  const router = useRouter();

  const handleRedirect = () => {
    onClose();
    closeDialog();
    router.push(`/topics/${slug}`);
  };

  return (
    <Popover open={open} onOpenChange={onClose}>
      <PopoverTrigger asChild>
         <button style={{ display: "none" }} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white border border-purple-400 rounded-lg p-4 shadow-lg">
        <p className="text-sm mb-3">
          A discussion with this title already exists. Would you like to view it?
        </p>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-purple-400 text-purple-200 hover:bg-purple-900"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={handleRedirect}
          >
            Go to Topic
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};


export default RedirectToSlug
