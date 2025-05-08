import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Package, Building2 } from "lucide-react";
import { useState } from "react";

interface AdCopyFormProps {
  productName: string;
  setProductName: (productName: string) => void;
  companyName: string;
  setCompanyName: (companyName: string) => void;
  description: string;
  setDescription: (description: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
  hasCopy: boolean;
}

const AdCopyForm = ({ 
  productName,
  hasCopy,
  setProductName,
  companyName,
  setCompanyName,
  description, 
  setDescription, 
  handleSubmit, 
  isGenerating 
}: AdCopyFormProps) => {
  const [errors, setErrors] = useState({
    productName: "",
    companyName: "",
    description: ""
  });

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {
      productName: "",
      companyName: "",
      description: ""
    };

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
      hasError = true;
    }

    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required";
      hasError = true;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={validateForm} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md dark:shadow-lg mb-8 border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="space-y-2">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Product Name
          </label>
          <div className="flex flex-col">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <Package size={18} />
              </div>
              <Input
                id="productName"
                placeholder="e.g., Premium Leather Wallet"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  if (errors.productName) setErrors({ ...errors, productName: "" });
                }}
                className={`pl-10 bg-white dark:bg-slate-700 ${errors.productName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} transition-colors`}
                disabled={isGenerating}
              />
            </div>
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Company Name
          </label>
          <div className="flex flex-col">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <Building2 size={18} />
              </div>
              <Input
                id="companyName"
                placeholder="e.g., Artisan Leatherworks"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (errors.companyName) setErrors({ ...errors, companyName: "" });
                }}
                className={`pl-10 bg-white dark:bg-slate-700 ${errors.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} transition-colors`}
                disabled={isGenerating}
              />
            </div>
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-5">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Describe your product or service
        </label>
        <Textarea
          id="description"
          placeholder="e.g., We offer premium handcrafted leather wallets with RFID protection and personalized monogramming..."
          rows={5}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: "" });
          }}
          className={`w-full p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          disabled={isGenerating}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 rounded-md transition-all dark:from-purple-500 dark:to-indigo-500 dark:hover:from-purple-600 dark:hover:to-indigo-600"
        disabled={isGenerating}
      >
        {hasCopy ? "Generate New copy" : isGenerating ? "Generating..." : "Generate Ad Copy"}
      </Button>
    </form>
  );
};

export default AdCopyForm;
