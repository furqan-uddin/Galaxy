import { BackButton } from "@/components/ui/back-button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <BackButton />
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Terms & Conditions</h1>
                    <p className="text-gray-600">Last updated: February 2026</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>1. Acceptance of Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">
                            By accessing and using Galaxy, you accept and agree to be bound by the terms
                            and provision of this agreement.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. Use License</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">
                            Permission is granted to temporarily access the materials on Galaxy for personal,
                            non-commercial transitory viewing only.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium mb-2">This license does not allow you to:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Modify or copy the materials</li>
                                <li>• Use the materials for commercial purposes</li>
                                <li>• Attempt to decompile or reverse engineer any software</li>
                                <li>• Remove any copyright or proprietary notations</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>3. Account Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">
                            You are responsible for safeguarding the password that you use to access Galaxy
                            and for any activities or actions under your password.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>4. Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">
                            Your use of Galaxy is also governed by our Privacy Policy. Please review our
                            Privacy Policy to understand our practices.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>5. Modifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">
                            Galaxy may revise these terms of service at any time without notice. By using
                            this platform, you are agreeing to be bound by the current version of these terms.
                        </p>
                    </CardContent>
                </Card>

                <div className="text-center pt-4">
                    <p className="text-sm text-gray-500">
                        For questions about these terms, please contact us through our contact page.
                    </p>
                </div>
            </div>
        </div>
    );
}
