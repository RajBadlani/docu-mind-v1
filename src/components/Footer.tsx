import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 w-full border-t border-blue-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          
          <div className="max-w-md">
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">
              Docu<span className="text-blue-600">Mind</span>
            </h3>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Turn PDFs into conversations. Built to help you explore documents,
              find answers faster, and spend less time searching.
            </p>
          </div>

          
          <div className="flex gap-12">
            
            <div className="flex flex-col gap-3 text-sm">
              <span className="font-medium text-gray-900">Product</span>
              <Link
                href="#how-it-work"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
            </div>

            
            <div className="flex flex-col gap-3 text-sm">
              <span className="font-medium text-gray-900">Connect</span>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail size={14} />
                Contact
              </Link>
              <Link
                href="/feedback"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageSquare size={14} />
                Feedback
              </Link>
            </div>
          </div>
        </div>

        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-blue-100 pt-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DocuMind
          </p>

          <p className="text-xs text-gray-500">
            Early product — built in public, feedback welcome 🙂
          </p>
        </div>
      </div>
    </footer>
  );
}
