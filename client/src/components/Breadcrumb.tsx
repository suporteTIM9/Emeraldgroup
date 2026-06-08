import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="container py-3">
      <ol className="flex items-center flex-wrap gap-1 text-xs text-gray-400">
        <li className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1 hover:text-[#02d49e] transition-colors">
            <Home size={11} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight size={11} className="text-gray-300" />
              {isLast || !item.href ? (
                <span className={isLast ? "text-gray-700 font-medium" : "hover:text-[#02d49e] transition-colors"}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#02d49e] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
