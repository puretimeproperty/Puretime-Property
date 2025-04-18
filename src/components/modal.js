import React, { useState } from 'react'
import addtoMailchimp from 'gatsby-plugin-mailchimp'

import { useModal } from '../context/modalContext'

const Modal = () => {
  const { isModalOpen, toggleModal, modalData } = useModal()
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phonenumber: '',
    address: '',
    postcode: modalData ? modalData.postcode : '',
    valuation: '',
    message: '',
    showForm: true,
    gdprPhone: false,
    gdprPost: false,
    formSuccess: false,
  })

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setState(prevState => ({
      ...prevState,
      message: "Submitting your information..."
    }))
    
    try {
      const response = await addtoMailchimp(state.email, {
        FNAME: state.firstName,
        LNAME: state.lastName,
        PHONE: state.phonenumber,
        ADDRESS: state.address,
        POSTCODE: state.postcode,
        VALUATION: state.valuation,
        'gdpr[282]': state.gdprPhone ? 'Y' : '',
        'gdpr[283]': state.gdprPost ? 'Y' : '',
      })

      const newMessage =
        response.result === 'success'
          ? `${response.msg}\n Keep an eye on your inbox and spam folder. We'll get back to you shortly.`
          : `Error: ${response.msg}`

      setState((prevState) => ({
        ...prevState,
        message: newMessage,
        showForm: response.result === 'success' ? false : true,
        formSuccess: response.result === 'success',
      }))

      // Hide the message after 6 seconds if the response is not successful
      if (response.result !== 'success') {
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            message: '',
          }))
        }, 6000)
      }
    } catch (error) {
      console.error("Mailchimp submission error:", error)
      setState((prevState) => ({
        ...prevState,
        message: error.message === "Timeout" 
          ? "Request timed out. Please try again later." 
          : `Error: ${error.message}`,
      }))
      
      // Hide error message after 6 seconds
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          message: '',
        }))
      }, 6000)
    }
  }

  const handleCloseModal = (e) => {
    if (e.target.id === 'contact_modal') toggleModal()
    // Only reset form data if it was successfully submitted
    if (state.formSuccess) {
      setState({
        email: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
        postcode: modalData ? modalData.postcode : '',
        valuation: '',
        message: '',
        showForm: true,
        gdprPhone: false,
        gdprPost: false,
        formSuccess: false,
      })
    }
  }

  return (
    <>
      {' '}
      {isModalOpen && (
        <div
          id="contact_modal"
          onClick={handleCloseModal}
          onKeyDown={handleCloseModal}
          className="fixed z-[10000] inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex flex-col justify-center overflow-hidden mx-auto "
        >
          <div className="w-full max-h-[90%] overflow-scroll p-6 m-auto bg-white rounded-md shadow-xl shadow-primary-600/40 lg:max-w-xl">
            <div>
              <span
                onClick={toggleModal}
                onKeyDown={toggleModal}
                className="inline-block p-2 overflow-hidden text-center relative top-0 right-0 float-right text-display-md text-primary-600 cursor-pointer whitespace-nowrap align-middle m-0"
                role="presentation"
              >
                &times;
              </span>
            </div>
            <div className="container mx-auto bg-white px-9 pt-1 pb-4 shadow rounded-4">
              <div className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full pt-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 lg:max-w-xl">
                  <h4 className="font-semibold text-display-sm tracking-widest font-display text-center underline underline-offset-2 text-primary-600">
                    {state.formSuccess ? "Thanks for contacting us!" : "Complete The Form To Receive Your Offer"}
                  </h4>

                  {state.showForm && (
                    <form
                      id="contact_form"
                      onSubmit={handleSubmit}
                      name="contact"
                      method="POST"
                      className="mt-6"
                    >
                      <div className="mb-2">
                        <label
                          htmlFor="firstName"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          First Name:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          value={state.firstName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="First Name"
                          name="firstName"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="lastName"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Last Name:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          value={state.lastName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Last Name"
                          name="lastName"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="phonenumber"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Phone Number:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="tel"
                          value={state.phonenumber}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Phone Number"
                          name="phonenumber"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="email"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Email:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="email"
                          value={state.email}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          name="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="address"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          First Line of Address:
                          <span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          value={state.address}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id="address"
                          name="address"
                          placeholder="First Line of Address"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="postcode"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Postcode:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id="postcode"
                          name="postcode"
                          placeholder="Postcode"
                          defaultValue={
                            modalData ? modalData.postcode : state.postcode
                          }
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="valuation"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Estimated Property Valuation (£):
                        </label>
                        <input
                          type="number"
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id="valuation"
                          name="valuation"
                          placeholder="500,000"
                          value={state.valuation}
                        />
                      </div>
                      <div className="mb-4 mt-6">
                        <div className="text-sm font-weight-semibold mb-2">Marketing Permissions</div>
                        <p className="text-body-xs mb-3">
                          By using this form you are agreeing to hear from us by email. Please select all the 
                          additional ways you would like to hear from Puretime Property Purchasing Ltd:
                        </p>
                        <div className="flex flex-col gap-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="gdprPhone"
                              checked={state.gdprPhone}
                              onChange={handleInputChange}
                              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm">Phone</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="gdprPost"
                              checked={state.gdprPost}
                              onChange={handleInputChange}
                              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm">Post</span>
                          </label>
                        </div>
                        {/* <p className="text-body-xs mt-2">
                          You can unsubscribe from our messages at any time by clicking the link in the footer of our emails.
                          For information about our privacy practices, please visit our website.
                        </p> */}
                      </div>
                      <div aria-hidden="true" className="hidden" hidden>
                        <input
                          type="text"
                          name="b_d0281388fbca39d6d0711dcea_4cd2acada4"
                          tabIndex="-1"
                          defaultValue=""
                        />
                      </div>
                      <div className="m-2 text-primary-600">
                        <p>
                          {' '}
                          <span className="text-red-600"> * </span> - Required
                          Fields
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-body-xs">
                          We use Mailchimp as our marketing platform. By
                          clicking submit below, you acknowledge being added to
                          our mailing list and your information will be
                          transferred to Mailchimp for processing.{' '}
                          <a
                            href="https://mailchimp.com/legal/terms"
                            className="text-primary-600 hover:underline"
                          >
                            Learn more
                          </a>{' '}
                          about Mailchimp's privacy practices. You can
                          unsubscribe from our messages at any time by clicking
                          the link in the footer of our emails.
                        </p>
                      </div>
                      <div className="mt-6 justify-center">
                        <input
                          type="submit"
                          className="cursor-pointer mx-auto rounded-full flex items-center justify-center bg-primary-600 text-white font-semibold px-5 py-3 text-body-xs uppercase w-100 form-control text-center"
                          value="Submit"
                        />
                      </div>
                    </form>
                  )}
                  <div id="form_response" className="mt-2 text-primary-600">
                    <p> {state.message} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  )
}
export default Modal
