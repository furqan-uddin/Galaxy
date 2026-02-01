import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Shield, Users, Zap, CheckCircle } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-500">
                    Secure. Scalable. Modern.
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto animate-in slide-in-from-bottom-5 duration-500 delay-100">
                    The ultimate reference platform for enterprise-grade authentication,
                    RBAC, and full-stack Next.js development.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-in slide-in-from-bottom-6 duration-500 delay-200">
                    <Link href="/register" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto px-8 shadow-md">Get Started</Button>
                    </Link>
                    <Link href="/about" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                            Learn More
                        </Button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                        <Button size="lg" variant="ghost" className="w-full sm:w-auto px-8">
                            Contact Sales
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                    Platform Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-lg">Secure Auth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                JWT-based authentication with email verification and password reset
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <CardTitle className="text-lg">Role-Based Access</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Multi-tier access control with User, Manager, and Admin roles
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-purple-600" />
                            </div>
                            <CardTitle className="text-lg">Modern Stack</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Built with Next.js 16, Prisma, PostgreSQL, and Tailwind CSS
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-orange-600" />
                            </div>
                            <CardTitle className="text-lg">Best Practices</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Clean code, error handling, validation, and professional UI/UX
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links Section */}
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    Explore More
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>About This Platform</CardTitle>
                            <CardDescription>
                                Learn about the technology and architecture
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                Discover how this platform demonstrates modern web development practices
                                and secure authentication patterns.
                            </p>
                            <Link href="/about">
                                <Button variant="outline" className="w-full">
                                    Read More
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>Contact Us</CardTitle>
                            <CardDescription>
                                Have questions or feedback?
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                Get in touch with us through our contact form. We'd love to hear from you.
                            </p>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full">
                                    Contact
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>Legal & Policies</CardTitle>
                            <CardDescription>
                                Terms of service and privacy
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                Review our terms and conditions and privacy policy documentation.
                            </p>
                            <div className="space-y-2">
                                <Link href="/terms">
                                    <Button variant="ghost" className="w-full justify-start text-sm">
                                        Terms & Conditions
                                    </Button>
                                </Link>
                                <Link href="/privacy">
                                    <Button variant="ghost" className="w-full justify-start text-sm">
                                        Privacy Policy
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
