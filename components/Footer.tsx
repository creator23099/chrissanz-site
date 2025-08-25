// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-[#0c1222] text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 items-start">
  
            {/* Brand */}
            <div className="order-1 lg:order-1">
              <h3 className="text-xl font-bold text-white mb-4">ChrisSanz.com</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI automation expert helping<br />
                businesses save time,<br />
                reduce costs, and increase<br />
                revenue with custom<br />
                automation systems.
              </p>
            </div>
  
            {/* Services */}
            <div className="order-2 lg:order-2">
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white" href="/services#lead-automation">Lead Response Automation</a></li>
                <li><a className="hover:text-white" href="/services">Sales Process Automation</a></li>
                <li><a className="hover:text-white" href="/services">Business Process Optimization</a></li>
                <li><a className="hover:text-white" href="/services">Custom AI Development</a></li>
                <li><a className="hover:text-white" href="/guarantee">ROI Approach</a></li>
              </ul>
            </div>
  
            {/* Company */}
            <div className="order-3 lg:order-3">
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white" href="/about">About Chris</a></li>
                <li><a className="hover:text-white" href="/case-studies">Case Studies</a></li>
                <li><a className="hover:text-white" href="/docs">Docs</a></li>
                <li><a className="hover:text-white" href="/strategy-call">Strategy Call</a></li>
              </ul>
            </div>
  
            {/* Subscribe (force right side on md+/lg) */}
            <div className="order-4 lg:order-4 md:col-start-3 lg:col-start-4">
              <h4 className="text-white font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">
                Join <span className="font-bold text-white">1,800+ founders &amp; operators</span> already getting practical AI
                playbooks and workflow tips.
              </p>
  
              <form className="flex gap-2 mb-3">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Join
                </button>
              </form>
              <p className="text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
  
              <div className="mt-6">
                <a
                  href="/strategy-call"
                  className="inline-block w-full rounded-lg bg-blue-600 px-4 py-2 text-center
                             font-semibold text-white hover:bg-blue-700 transition"
                >
                  Book Strategy Call
                </a>
                <ul className="mt-4 space-y-1 text-gray-400 text-sm">
                  <li>📞 Free 30-minute consultation</li>
                  <li>💬 Custom automation roadmap</li>
                  <li>🎯 Profit optimization analysis</li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Signature */}
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} ChrisSanz.com. All rights reserved. • AI Business Automation | Lead Response Systems | Process Optimization | Custom AI Development
          </div>
        </div>
      </footer>
    );
  }