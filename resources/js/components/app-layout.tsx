import { AppShell } from '@/components/app-shell';
import { BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppShell breadcrumbs={breadcrumbs}>
            {children}
        </AppShell>
    );
}