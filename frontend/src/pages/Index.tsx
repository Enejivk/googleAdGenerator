import { useEffect, useState } from "react";
import AdCopyForm from "@/components/AdCopyForm";
import AdCopyResults from "@/components/AdCopyResults";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { api } from '../api/axios';
import { AxiosError } from 'axios';

const Index = () => {
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [adCopies, setAdCopies] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    
  }, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    setAdCopies([]);

    try {
      const response = await api.post("/generate-ads", {
        company_name: productName,
        product_name: companyName,
        description: description,
      });

      if (response.status === 200) {
        const adCopies = response.data["ads"];
        setAdCopies(adCopies)
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        toast({
          title: "Rate Limit Exceeded",
          description: "You have exceeded the maximum request limit. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred while generating ad copies",
          variant: "destructive",
        });
      }
      console.error("Error generating ads:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyAdd = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success!",
        description: "Ad copy has been copied to clipboard",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <header className="mb-10 text-center">
          <div className="inline-block mb-4 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">
            AI-Powered Google Ads Copy Generator
          </h1>

          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors">
            Quickly generate compelling ad copy for your Google Ads campaigns using AI
          </p>
        </header>

        <AdCopyForm
          productName={productName}
          setProductName={setProductName}
          companyName={companyName}
          setCompanyName={setCompanyName}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          isGenerating={isGenerating}
          hasCopy={adCopies.length > 0}
        />

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin mb-3">
              <Loader size={32} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 transition-colors">Generating your ad copies...</p>
          </div>
        )}

        {adCopies.length > 0 && !isGenerating && (
          <AdCopyResults
            adCopies={adCopies}
            handleCopyAdd={handleCopyAdd}
            isCreating={isCreating}
          />
        )}
      </div>
    </div>
  );
};

export default Index;