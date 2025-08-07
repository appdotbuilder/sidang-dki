import { SidebarProvider } from '@/components/ui/sidebar';
import { AppContent } from '@/components/app-content';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItem[];
}

export function AppShell({ children, variant = 'sidebar', breadcrumbs }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar />
            <AppContent>
                {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                {children}
            </AppContent>
        </SidebarProvider>
    );
}
