import { BackButton } from "@/components/ui/back-button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Shield, Zap, Smartphone, Database, Lock, Globe, Server, Code } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <BackButton />
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">About Galaxy</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Building the future of secure, scalable, and modern web applications.
                    </p>
                </div>

                {/* Mission Section */}
                <Card className="border-t-4 border-t-primary shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Globe className="h-6 w-6 text-primary" />
                            Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Galaxy is a premier demonstration platform designed to showcase the pinnacle of modern web development best practices.
                            Our mission is to provide a reference implementation for building secure, scalable, and maintainable web applications
                            using enterprise-grade technologies.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Built with the cutting-edge Next.js 16, powered by a robust PostgreSQL database, and secured with industry-standard
                            authentication patterns, Galaxy represents a comprehensive masterclass in full-stack development.
                        </p>
                    </CardContent>
                </Card>


                {/* Highlights Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="h-5 w-5 text-blue-600" />
                                Secure by Design
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Enterprise-grade security with JWT authentication, role-based access control (RBAC),
                                middleware protection, and comprehensive audit logging.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-amber-500" />
                                High Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Built on Next.js 16 with optimized server components, dynamic rendering,
                                and efficient database queries using Prisma ORM.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Smartphone className="h-5 w-5 text-purple-500" />
                                Mobile First
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Beautiful, responsive design using Tailwind CSS 4 and ShadCN UI
                                components, ensuring a seamless experience on any device.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tech Stack */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="h-6 w-6 text-gray-700" />
                            Technology Stack
                        </CardTitle>
                        <CardDescription>
                            Powered by the latest and most reliable technologies in the industry
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                    <Smartphone className="h-5 w-5 text-indigo-500" />
                                    <h3 className="font-semibold text-lg">Frontend Architecture</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 ml-1">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                                        Next.js 16 (App Router)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                                        React 19 Server Components
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                                        Tailwind CSS 4 & ShadCN UI
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                                        Lucide React Icons
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                    <Server className="h-5 w-5 text-emerald-500" />
                                    <h3 className="font-semibold text-lg">Backend Infrastructure</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 ml-1">
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                                        Node.js & Next.js API Routes
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                                        PostgreSQL Database
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                                        Prisma ORM
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                                        JWT & BCrypt Security
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
