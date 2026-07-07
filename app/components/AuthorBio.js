import { Globe, Mail, Link2, Award } from "lucide-react";

const AUTHORS = {
  "Pete Overdrive": {
    role: "Lead Architect & Prompt Engineer",
    bio: "Former AI researcher specializing in multi-agent routing configurations and cognitive pipeline design. Pete writes our deep-dives on the Gemini API and Antigravity SDK.",
    website: "https://github.com/peteoverdrive",
    email: "mailto:pete@neutraloverdrive.com",
    avatar: "P"
  },
  "Sofia Vance": {
    role: "UI/UX Designer & Midjourney Guru",
    bio: "Digital artist specializing in visual model engineering, viewport lighting metrics, and image physics. Sofia edits our columns on Midjourney and DALL-E.",
    website: "#",
    email: "mailto:sofia@neutraloverdrive.com",
    avatar: "S"
  },
  "Neutral Overdrive Team": {
    role: "Editorial Engineering Board",
    bio: "A collaborative panel of AI prompt engineers, system architects, and technical editors vetting generative models for industrial use cases.",
    website: "https://github.com/neutraloverdrive",
    email: "mailto:ads@neutraloverdrive.com",
    avatar: "N"
  }
};

export default function AuthorBio({ authorName = "Neutral Overdrive Team" }) {
  const author = AUTHORS[authorName] || AUTHORS["Neutral Overdrive Team"];

  return (
    <div className="w-full bg-slate-950/40 border border-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start my-10 relative overflow-hidden">
      {/* Visual authority indicator for search engines */}
      <div className="absolute top-3 right-3 text-slate-800 pointer-events-none">
        <Award className="h-10 w-10 stroke-1" />
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0">
        <span className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center font-bold text-black text-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          {author.avatar}
        </span>
      </div>

      {/* Text Info */}
      <div className="space-y-2 flex-1">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
            Author Profile
          </span>
          <h4 className="text-base font-bold text-white leading-tight">{authorName}</h4>
          <span className="text-xs text-brand-cyan mt-0.5 inline-block">{author.role}</span>
        </div>
        
        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
          {author.bio}
        </p>

        {/* Links list */}
        <div className="flex items-center gap-3 pt-2 text-slate-500">
          {author.website && author.website !== "#" && (
            <a href={author.website} className="hover:text-white transition-colors flex items-center gap-1 text-xs" target="_blank" rel="noopener noreferrer" aria-label="Website Link">
              <Globe className="h-3.5 w-3.5" />
              <span className="text-[10px]">Website</span>
            </a>
          )}
          {author.email && author.email !== "#" && (
            <a href={author.email} className="hover:text-white transition-colors flex items-center gap-1 text-xs" aria-label="Email Link">
              <Mail className="h-3.5 w-3.5" />
              <span className="text-[10px]">Email</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
