// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">ChrisSanz.com</h3>
            <p className="text-gray-400 mb-4">
              AI automation that saves time, reduces costs, and grows revenue with
              custom-built systems that fit your workflows.
            </p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Documentation & Guides</p>
              <p>AI Business Automation Docs</p>
            </div>
          </div>

          {/* Common Questions (links to Docs sections) */}
          <div>
            <h4 className="font-semibold mb-4">Common Questions</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/docs#pricing" className="hover:text-white transition-colors">
                  Pricing & Investment
                </a>
              </li>
              <li>
                <a href="/docs#process" className="hover:text-white transition-colors">
                  Implementation Process
                </a>
              </li>
              <li>
                <a href="/docs#technology" className="hover:text-white transition-colors">
                  Technology & Integration
                </a>
              </li>
              <li>
                <a href="/docs#results" className="hover:text-white transition-colors">
                  Results & Measurement
                </a>
              </li>
              <li>
                <a href="/docs#general" className="hover:text-white transition-colors">
                  Getting Started
                </a>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-semibold mb-4">AI Automation Topics</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Lead Response Automation
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Sales Process Automation
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Business Process Optimization
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Custom AI Development
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4">Get Answers</h4>
            <p className="text-gray-400 mb-4">
              Still have questions? Get personalized recommendations from an AI
              automation expert.
            </p>
            <a
              href="/strategy-call"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
            >
              Book a Strategy Call
            </a>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Free consultation</p>
              <p>Responses within 24 hours</p>
              <p>Tailored to your workflows</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ChrisSanz.com. All rights reserved.</p>
          <p className="text-sm mt-2">
            AI Automation | Business Process Automation | Lead Response Systems | Custom AI Development
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/blog" className="hover:text-white transition-colors">
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
