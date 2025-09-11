import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 md:pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 dark:from-violet-600/20 dark:to-purple-600/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: September 11, 2025
            </p>
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
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Introduction</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Welcome to ZESHO ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you visit our website and use our educational platform services.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Information We Collect</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      We may collect personally identifiable information that you voluntarily provide, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                      <li>Name and email address</li>
                      <li>University or educational institution</li>
                      <li>Academic interests and subjects</li>
                      <li>Profile information and preferences</li>
                      <li>Communications with our support team</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Usage Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      We automatically collect certain information about your use of our services:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our platform</li>
                      <li>Resources downloaded and uploaded</li>
                      <li>Search queries and interaction patterns</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Cookies and Tracking</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We use cookies and similar tracking technologies to enhance your experience, 
                      analyze usage patterns, and provide personalized content recommendations.
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Provide and maintain our educational platform services</li>
                  <li>Process your account registration and authentication</li>
                  <li>Personalize your learning experience and content recommendations</li>
                  <li>Facilitate resource sharing and community interactions</li>
                  <li>Send important notifications about your account and platform updates</li>
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Comply with legal obligations and resolve disputes</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Information Sharing and Disclosure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">We Do Not Sell Your Data</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We do not sell, trade, or otherwise transfer your personal information to third parties 
                      for commercial purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Limited Sharing</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      We may share your information in the following limited circumstances:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                      <li>With your explicit consent</li>
                      <li>To comply with legal requirements or protect our rights</li>
                      <li>With trusted service providers who assist in operating our platform</li>
                      <li>In connection with a business transfer or acquisition</li>
                      <li>To protect the safety and security of our users and platform</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to use commercially acceptable means to protect your information, 
                  we cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Privacy Rights</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of certain communications</li>
                  <li>Data portability and export</li>
                  <li>Object to processing for direct marketing</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  To exercise these rights, please contact us at privacy@zesho.edu
                </p>
              </section>

              {/* Data Retention */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Data Retention</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We retain your personal information only for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy, comply with legal obligations, resolve disputes, 
                  and enforce our agreements. When you delete your account, we will remove your personal 
                  information within a reasonable timeframe, except where retention is required by law.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Children's Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our services are intended for users aged 13 and above. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and 
                  believe your child has provided us with personal information, please contact us 
                  immediately so we can delete such information.
                </p>
              </section>

              {/* Updates to Policy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Updates to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or applicable laws. We will notify you of any material changes by posting the new 
                  Privacy Policy on our website and updating the "Last updated" date. 
                  Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-12 p-6 bg-violet-50 dark:bg-violet-900/20 rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p><strong>Email:</strong> privacy@zesho.edu</p>
                  <p><strong>Address:</strong> ZESHO Platform, Innovation Campus, Tech District</p>
                  <p><strong>Support:</strong> Available 24/7 through our platform</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
