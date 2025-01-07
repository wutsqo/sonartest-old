import getToastErrorMessage from 'commons/utils/getToastErrorMessage'
import toast from 'react-hot-toast'

const ToasterError = ({ error, t }) => {
  return (
    <div className="flex align-center gap-2">
      <p className="break-all">{getToastErrorMessage(error)}</p>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 items-center justify-center flex-shrink-0 rounded-lg p-2 inline-flex h-8 w-8 hover:bg-gray-100"
        data-dismiss-target="#toast-interactive"
        aria-label="Close"
        onClick={() => toast.dismiss(t.id)}
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  )
}

export default ToasterError
