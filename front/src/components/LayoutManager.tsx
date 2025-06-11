"use client";

import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/SideBar";
import ExcludedWrapper from "@/components/ExcludedWrapper";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function LayoutManager({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [isMobileOverlay, setIsMobileOverlay] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);

    const toggleSidebarCollapse = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 1024) {
            setSidebarCollapsed(true);
            setIsNavbarOpen(false);
        }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
        const isMobile = window.innerWidth < 1024;
        setIsMobileOverlay(!isSidebarCollapsed && isMobile);
        }
    }, [isSidebarCollapsed]);

    useOutsideClick(sidebarRef, () => {
        if (window.innerWidth < 1024 && !isSidebarCollapsed) {
        setSidebarCollapsed(true);
        }
    });

    useOutsideClick(navbarRef, () => {
        if (window.innerWidth < 1024 && isNavbarOpen) {
        setIsNavbarOpen(false);
        }
    });

    return (
        <>
        {isMobileOverlay && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
        )}

        <ExcludedWrapper>
            <SideBar
            ref={sidebarRef}
            isCollapsed={isSidebarCollapsed}
            toggleCollapse={toggleSidebarCollapse}
            />
        </ExcludedWrapper>

        <div
            className={`transition-none duration-0 ${
            isSidebarCollapsed ? "sm:ml-20" : "sm:ml-64"
            }`}
        >
            <ExcludedWrapper>
            <div ref={navbarRef}>
                <Navbar
                isOpen={isNavbarOpen}
                toggleMenu={() => setIsNavbarOpen(!isNavbarOpen)}
                />
            </div>
            </ExcludedWrapper>

            <div className="p-4 absolute">{children}</div>
        </div>
        </>
    );
};