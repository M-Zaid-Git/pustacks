import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <NavBar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 md:pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 dark:from-violet-600/20 dark:to-purple-600/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Terms of Service</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Please read these terms carefully before using our educational platform.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Last updated: September 11, 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="floating-card p-8 md:p-12">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Agreement to Terms</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  These Terms of Service ("Terms") govern your access to and use of ZESHO platform ("Service") operated
                  by ZESHO ("us", "we", or "our").
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                  of these terms, then you may not access the Service.
                </p>
              </section>

              {/* Use of Service */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Use of Service</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Eligibility</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      You must be at least 13 years old to use our Service. By using the Service, you represent and
                      warrant that you meet this age requirement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Registration</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      To access certain features, you may need to create an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                      <li>Provide accurate and complete information</li>
                      <li>Keep your account credentials secure</li>
                      <li>Notify us immediately of any unauthorized use</li>
                      <li>Take responsibility for all activities under your account</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Acceptable Use</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      You agree to use the Service only for lawful purposes and in accordance with these Terms. Our
                      platform is designed for educational purposes and collaborative learning.
                    </p>
                  </div>
                </div>
              </section>

              {/* Prohibited Activities */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Prohibited Activities</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">You may not use our Service to:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Upload, share, or distribute copyrighted material without permission</li>
                  <li>Post harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to other users' accounts</li>
                  <li>Use automated systems to scrape or harvest data</li>
                  <li>Distribute malware, viruses, or other harmful code</li>
                  <li>Engage in any form of harassment or bullying</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Interfere with the proper functioning of the Service</li>
                </ul>
              </section>

              {/* Content and Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Content and Intellectual Property
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">User Content</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">By uploading content to our platform, you:</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                      <li>Retain ownership of your intellectual property rights</li>
                      <li>Grant us a license to host, display, and distribute your content</li>
                      <li>Represent that you have the right to share the content</li>
                      <li>Agree that your content may be accessed by other users</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Platform Content</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our platform, including its design, features, and proprietary content, is protected by
                      intellectual property laws. You may not copy, modify, or create derivative works without our
                      permission.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Copyright Policy</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We respect intellectual property rights and expect our users to do the same. If you believe your
                      copyright has been infringed, please contact us at copyright@zesho.edu with detailed information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy and Data */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy and Data Protection</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  By using our Service, you consent to the collection and use of your information as described in our
                  Privacy Policy.
                </p>
              </section>

              {/* Service Availability */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Service Availability</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We strive to provide reliable and continuous access to our Service. However, we may:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Temporarily suspend the Service for maintenance or updates</li>
                  <li>Modify or discontinue features without prior notice</li>
                  <li>Limit access to certain features or content</li>
                  <li>Block access from specific regions due to legal requirements</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  We are not liable for any interruption or unavailability of the Service.
                </p>
              </section>

              {/* Disclaimer and Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Disclaimer and Limitation of Liability
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Service Disclaimer</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      The Service is provided "as is" and "as available" without warranties of any kind. We do not
                      guarantee the accuracy, completeness, or reliability of any content or information on the
                      platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Educational Content</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      While we encourage quality educational content, we cannot verify the accuracy of all materials
                      shared by users. Use educational resources at your own discretion and verify information
                      independently.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Limitation of Liability
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To the maximum extent permitted by law, ZESHO shall not be liable for any indirect, incidental,
                      special, or consequential damages arising from your use of the Service.
                    </p>
                  </div>
                </div>
              </section>

              {/* Account Termination */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Account Termination</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Termination by You</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      You may terminate your account at any time by contacting us or using the account deletion feature
                      in your dashboard.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Termination by Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      We may suspend or terminate your account if you:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                      <li>Violate these Terms of Service</li>
                      <li>Engage in prohibited activities</li>
                      <li>Pose a security risk to the platform</li>
                      <li>Remain inactive for an extended period</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Effect of Termination</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upon termination, your access to the Service will cease, and we may delete your account and
                      associated data in accordance with our data retention policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes by
                  posting the updated Terms on our website and updating the "Last updated" date. Your continued use of
                  the Service after such changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Governing Law and Dispute Resolution
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These Terms shall be governed by and construed in accordance with applicable laws. Any disputes
                  arising from these Terms or your use of the Service will be resolved through good faith negotiations.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  If a dispute cannot be resolved through negotiation, it may be subject to binding arbitration or
                  resolved in appropriate courts, depending on applicable law.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-12 p-6 bg-violet-50 dark:bg-violet-900/20 rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>Email:</strong> legal@zesho.edu
                  </p>
                  <p>
                    <strong>Support:</strong> support@zesho.edu
                  </p>
                  <p>
                    <strong>Address:</strong> ZESHO Platform, Innovation Campus, Tech District
                  </p>
                  <p>
                    <strong>Website:</strong> www.zesho.edu
                  </p>
                </div>
              </section>

              {/* Acknowledgment */}
              <section className="p-6 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Acknowledgment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  By using ZESHO platform, you acknowledge that you have read, understood, and agree to be bound by
                  these Terms of Service and our Privacy Policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
