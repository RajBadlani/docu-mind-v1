import { FileText } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import PdfActionButtons from "./PdfActionButtons";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: string;
  key : string;
}

interface UploadedFileListProps {
  uploadedPdfs: UploadedFile[];
}

const UploadedFileList = ({ uploadedPdfs }: UploadedFileListProps) => {
  return (
    <div>
      <section className="relative w-full max-w-5xl mx-auto mt-6 rounded-2xl bg-white/80 backdrop-blur-md p-4 sm:p-6 shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-col gap-5 h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-55">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 tracking-tight">
              Uploaded PDF(s)
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {uploadedPdfs.length} PDF(s)
            </p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-3 rounded-xl border border-dashed border-gray-200 bg-linear from-gray-50 to-gray-100/60 p-4 overflow-auto">
            {uploadedPdfs.length > 0 ? (
              uploadedPdfs.map((file, index) => (
                <BlurFade key={file.id} delay={index * 0.04} inView>
                  <div className="group flex items-center justify-between w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5">
                    {/* Left */}
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex items-center justify-center rounded-lg bg-blue-50 p-2">
                        <FileText
                          width={24}
                          height={24}
                          className="text-blue-600 shrink-0"
                        />
                      </div>

                      <div className="flex flex-col truncate">
                        <span className="font-medium text-sm sm:text-base text-gray-800 truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>

                    {/* Right – Actions */}
                    <div className="shrink-0 flex items-center gap-2 ">
                      <PdfActionButtons  pdfId={file.id} />
                    </div>
                  </div>
                </BlurFade>
              ))
            ) : (
              <BlurFade inView>
                <div className="flex flex-col items-center justify-center h-full gap-2 text-center text-gray-500">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <p className="text-sm font-medium">No PDFs uploaded yet</p>
                  <p className="text-xs text-gray-400">
                    Upload a PDF to see it listed here
                  </p>
                </div>
              </BlurFade>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadedFileList;
