import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,

  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

export default function ShareModal({ open, onClose, shareUrl, title }) {
  if (!open) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box space-y-5">
        <h3 className="text-xl font-bold">Share this lesson</h3>

        <p className="text-base-content/60">
          Select a platform to share.
        </p>

        <div className="flex gap-4 justify-center">

          {/* Facebook */}
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={48} round />
          </LinkedinShareButton>

          {/* X / Twitter */}
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>

          {/* Email */}
          <EmailShareButton url={shareUrl} subject={title} body="Check this out!">
            <EmailIcon size={48} round />
          </EmailShareButton>
        </div>

        {/* Modal Actions */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
}
