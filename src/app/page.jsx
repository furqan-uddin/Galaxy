import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Galaxy</h1>
                <p className="text-xl text-gray-600 mb-8">
                    A modern, secure, and scalable platform built with Next.js
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/register">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/about">
                        <Button size="lg" variant="outline">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>About Us</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Learn more about our mission and what we do.
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
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Have questions? Get in touch with our team.
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
                            <CardTitle>Our Policies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Read our terms and privacy policy.
                            </p>
                            <div className="space-y-2">
                                <Link href="/terms">
                                    <Button variant="ghost" className="w-full justify-start">
                                        Terms & Conditions
                                    </Button>
                                </Link>
                                <Link href="/privacy">
                                    <Button variant="ghost" className="w-full justify-start">
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
