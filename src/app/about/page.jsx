import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">About Galaxy</h1>
                    <p className="text-xl text-gray-600">
                        Building the future of secure web applications
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            Galaxy is a modern, secure, and scalable platform built with cutting-edge technologies.
                            Our mission is to provide a robust foundation for web applications that prioritize
                            security, user experience, and developer productivity.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Built with Next.js, powered by PostgreSQL, and secured with industry-standard
                            authentication practices, Galaxy represents the best of modern web development.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">🔒 Secure</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Enterprise-grade security with JWT authentication, role-based access control,
                                and comprehensive audit logging.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">⚡ Fast</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Built on Next.js 16 with optimized performance, server-side rendering,
                                and efficient database queries.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">📱 Responsive</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Beautiful, mobile-first design using Tailwind CSS and ShadCN UI
                                components for a seamless experience.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Technology Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2">Frontend</h3>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li>• Next.js 16 (App Router)</li>
                                    <li>• Tailwind CSS 4</li>
                                    <li>• ShadCN UI Components</li>
                                    <li>• React 19</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Backend</h3>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li>• PostgreSQL Database</li>
                                    <li>• Prisma ORM</li>
                                    <li>• JWT Authentication</li>
                                    <li>• Email Verification</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
