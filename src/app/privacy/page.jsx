import { BackButton } from "@/components/ui/back-button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <BackButton />
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="text-gray-600">Last updated: February 2026</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Our Commitment to Privacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                            At Galaxy, we take your privacy seriously. This policy describes how we collect,
                            use, and protect your personal information.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Information We Collect</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Personal Information</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Name and email address</li>
                                <li>• Account credentials (encrypted)</li>
                                <li>• Profile information</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Usage Information</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Activity logs and timestamps</li>
                                <li>• IP addresses for security purposes</li>
                                <li>• Browser and device information</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How We Use Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-gray-700 space-y-2">
                            <li>• To provide and maintain our service</li>
                            <li>• To notify you about changes to our service</li>
                            <li>• To provide customer support</li>
                            <li>• To detect, prevent and address technical issues</li>
                            <li>• To fulfill legal obligations</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">
                            We implement industry-standard security measures to protect your personal information:
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Encrypted password storage using bcrypt</li>
                                <li>• JWT-based authentication</li>
                                <li>• Role-based access control</li>
                                <li>• Regular security audits</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Rights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            You have the right to:
                        </p>
                        <ul className="text-gray-700 space-y-1">
                            <li>• Access your personal data</li>
                            <li>• Correct inaccurate data</li>
                            <li>• Request deletion of your data</li>
                            <li>• Export your data</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us through
                            our contact page.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
