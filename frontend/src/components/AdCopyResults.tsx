import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

interface AdCopyResultsProps {
  adCopies: string[];
  handleCopyAdd: (text: string) => void;
  isCreating: number | null;
}

const AdCopyResults = ({ adCopies, handleCopyAdd, isCreating }: AdCopyResultsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 transition-colors">Generated Ad Copies</h2>
      {adCopies.map((adCopy, index) => (
        <Card key={index} className="overflow-hidden bg-white dark:bg-slate-800 border-gray-100 dark:border-gray-700 transition-colors">
          <div className="p-5 border-l-4 border-purple-500 dark:border-purple-400">
            <div className="mb-4">
              <span className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full mb-2 transition-colors">
                Ad Copy {index + 1}
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-medium transition-colors">{adCopy}</p>
            </div>
            <Button
              onClick={() => handleCopyAdd(adCopy)}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-md transition-colors"
              disabled={isCreating === index}
            >
              <div className="flex items-center gap-2">
                {isCreating === index ? (
                  <span>Copying...</span>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Text</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdCopyResults;
