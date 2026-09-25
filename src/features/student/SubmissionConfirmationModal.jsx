import { useState } from 'react'
import { ArrowRight, Check, CheckCircle2, FileText, ShieldCheck, X } from 'lucide-react'
import { formatDate } from '../../utils/assignment'

export default function SubmissionConfirmationModal({ assignment, onClose, onConfirm }) {
  const [step, setStep] = useState(1)
  const finalStep = step === 2

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button>
        <div className={`confirm-icon ${finalStep ? 'confirm-icon-success' : ''}`}>
          {finalStep ? <ShieldCheck size={25} /> : <CheckCircle2 size={25} />}
        </div>
        <div className="modal-step">CONFIRMATION {step} OF 2</div>
        <h2 id="confirm-title">{finalStep ? 'One last check' : 'Have you submitted it?'}</h2>
        <p>
          {finalStep
            ? 'Please verify that your work has been submitted. Your professor will see this update.'
            : `Confirm that you’ve submitted “${assignment.title}” through the course submission link.`}
        </p>
        <div className="confirm-assignment">
          <FileText size={17} />
          <div><strong>{assignment.title}</strong><small>{assignment.course} · Due {formatDate(assignment.due)}</small></div>
        </div>
        <div className="modal-actions">
          <button className="button-secondary" onClick={onClose}>Not yet</button>
          {finalStep ? (
            <button className="button-primary" onClick={onConfirm}><Check size={16} /> Confirm submission</button>
          ) : (
            <button className="button-primary" onClick={() => setStep(2)}>Yes, I have submitted <ArrowRight size={16} /></button>
          )}
        </div>
        <div className="step-dots"><i className={step === 1 ? 'dot-current' : 'dot-past'} /><i className={finalStep ? 'dot-current' : ''} /></div>
      </section>
    </div>
  )
}
