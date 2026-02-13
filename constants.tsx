
import React from 'react';
// Import missing icon from lucide-react
import { Mail } from 'lucide-react';

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const PolicyData = {
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: (
        <>
          <p>Pro Teacher Manager ("we") operates the Pro Teacher Manager mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.</p>
          <p className="font-medium text-slate-900">Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the App.</p>
        </>
      )
    },
    {
      id: 'information-collect',
      title: 'Information We Collect',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Personal Information</h4>
            <p>When you register and use Pro Teacher Manager, we collect the following personal information:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Account Information:</strong> Name, email address, and profile picture (via Google Sign-In).</li>
              <li><strong>User-Generated Content:</strong> Institute details, Class information, Student names/info, Attendance records, Payment records, Exam data, and Notes.</li>
              <li><strong>Photos:</strong> Optional - used for student profiles if you choose to upload them.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Automatically Collected Information</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers.</li>
              <li><strong>Usage Data:</strong> App features used and time spent in the app.</li>
              <li><strong>Error Logs:</strong> Crash reports and diagnostic information to help us fix bugs.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 rounded-2xl">
            <h4 className="font-bold text-blue-700 mb-2 text-sm uppercase">Functionality</h4>
            <p className="text-sm">Manage institutes, classes, track attendance, and process payments records.</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-2xl">
            <h4 className="font-bold text-blue-700 mb-2 text-sm uppercase">AI Features</h4>
            <p className="text-sm">Generate AI-powered syllabi using Google Gemini AI and create professional PDF reports.</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-2xl">
            <h4 className="font-bold text-blue-700 mb-2 text-sm uppercase">Management</h4>
            <p className="text-sm">Authenticate users via Google Sign-In and handle subscription status.</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-2xl">
            <h4 className="font-bold text-blue-700 mb-2 text-sm uppercase">Communication</h4>
            <p className="text-sm">Send important app updates, respond to support, and subscription reminders.</p>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Data Storage and Security',
      content: (
        <div className="space-y-4">
          <div className="border border-slate-200 p-6 rounded-3xl">
            <h4 className="font-bold text-slate-900 mb-3">Cloud Infrastructure</h4>
            <p className="text-sm mb-4">Your data is stored securely using Firebase by Google:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white border border-slate-100 rounded-xl">
                <div className="font-bold text-blue-600">Auth</div>
                <div className="text-[10px] text-slate-400">Firebase Authentication</div>
              </div>
              <div className="text-center p-3 bg-white border border-slate-100 rounded-xl">
                <div className="font-bold text-blue-600">Firestore</div>
                <div className="text-[10px] text-slate-400">Encrypted Database</div>
              </div>
              <div className="text-center p-3 bg-white border border-slate-100 rounded-xl">
                <div className="font-bold text-blue-600">Storage</div>
                <div className="text-[10px] text-slate-400">Secure Media Hosting</div>
              </div>
            </div>
          </div>
          <p>We implement industry-standard security measures, including data encryption in transit (HTTPS/TLS) and at rest. Our multi-tenant architecture ensures complete data isolation between users.</p>
        </div>
      )
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      content: (
        <>
          <p>We use trusted services to provide core functionality:</p>
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
              <span className="font-semibold">Google Sign-In</span>
              <a href="https://policies.google.com/privacy" className="text-blue-600 text-sm hover:underline flex items-center gap-1">Policy <span className="text-xs">↗</span></a>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
              <span className="font-semibold">Firebase (Google)</span>
              <a href="https://firebase.google.com/support/privacy" className="text-blue-600 text-sm hover:underline flex items-center gap-1">Policy <span className="text-xs">↗</span></a>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
              <span className="font-semibold">Google Gemini AI</span>
              <a href="https://policies.google.com/privacy" className="text-blue-600 text-sm hover:underline flex items-center gap-1">Policy <span className="text-xs">↗</span></a>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
              <span className="font-semibold">Google Play Billing</span>
              <a href="https://payments.google.com/payments/apis-secure/get_legal_document?ldo=0&ldt=privacynotice" className="text-blue-600 text-sm hover:underline flex items-center gap-1">Policy <span className="text-xs">↗</span></a>
            </div>
          </div>
        </>
      )
    },
    {
        id: 'sharing',
        title: 'Data Sharing',
        content: (
            <>
                <p>We <strong>DO NOT</strong> sell, trade, or rent your personal information to third parties. We share data only with your consent (e.g., WhatsApp sharing), with service providers for app functionality, for legal requirements, or in business transfers.</p>
            </>
        )
    },
    {
        id: 'rights',
        title: 'Your Data Rights',
        content: (
            <div className="space-y-4">
                <p>You have the right to Access, Rectify, Delete, or Export your data at any time.</p>
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                    <h4 className="font-bold text-blue-900 mb-2">How to exercise your rights:</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li><strong>Delete Account:</strong> Use the "Delete Account" feature in App settings.</li>
                        <li><strong>Export Data:</strong> Email us at <a href="mailto:vithuve21@gmail.com" className="underline">vithuve21@gmail.com</a>.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Active Accounts:</strong> Data is retained as long as your account is active.</li>
          <li><strong>Deleted Accounts:</strong> Data is permanently purged from main databases within 30 days.</li>
          <li><strong>Backups:</strong> Full deletion from all secondary systems within 90 days.</li>
        </ul>
      )
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: (
        <p>Pro Teacher Manager is designed for use by educators (18+). While teachers may store info about students, we do not knowingly collect personal info directly from children under 13. If you are a parent/guardian and believe we have collected such info, please contact us immediately.</p>
      )
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Integration',
      content: (
        <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-sm text-green-800">
          <p className="font-bold mb-1 text-green-900">Privacy Notice:</p>
          We do not collect or store parent phone numbers. The app uses your local WhatsApp application. We have zero access to your message content or conversation history.
        </div>
      )
    },
    {
      id: 'subscription',
      title: 'Premium Subscription',
      content: (
        <p>Payments are handled exclusively by Google Play Billing. We receive confirmation of status but <strong>never</strong> store or access your credit card details.</p>
      )
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: (
        <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <p className="mb-4">Questions about your privacy? Reach out to our team:</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Support Email</div>
                <div className="font-semibold text-slate-900">
                  <a href="mailto:vithuve21@gmail.com" className="hover:text-blue-600 transition-colors">vithuve21@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'consent',
      title: 'Consent',
      content: (
        <p className="italic text-slate-500">By using Pro Teacher Manager, you consent to this Privacy Policy and agree to its terms.</p>
      )
    }
  ]
};
