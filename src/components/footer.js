import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { useModal } from '../context/modalContext'

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allFooterJson {
        nodes {
          contact {
            Address
            Company
            Email
            Phone
          }
          social {
            href
            name
            icon {
              publicURL
            }
          }
        }
      }
    }
  `)
  const { toggleModal } = useModal()
  return (
    <>
      <footer>
        <div className="container mx-auto">
          <div className="mt-2 md:mb-20 mb-10">
            <hr className="text-neutral-300"></hr>
          </div>
          <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-12">
            <div className="lg:col-span-6 md:pr-24">
              <h3 className="font-display md:text-display-lg text-display-sm font-normal pb-4">
                Want To Sell Your Property Fast?
              </h3>
              <a
                href="/#"
                onClick={toggleModal}
                className="cursor-pointer font-display md:text-display-lg text-display-sm italic text-primary-600 underline decoration-black underline-offset-2"
              >
                Get In Contact
              </a>
            </div>
            {data.allFooterJson.nodes[0].contact.map((detail, i) => (
              <div
                key={i}
                className="lg:col-span-6 flex flex-col gap-8 xl:pl-30 lg:pl-14"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-display-xs font-display font-normal underline decoration-primary-600">
                    {detail.Company}
                  </p>
                  <p className="text-body-sm font-light text-neutral-900">
                    {detail.Address}.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-body-sm font-light text-neutral-900 decoration-primary-600 underline">
                    Email us at:
                  </p>
                  <a
                    className="xl:text-display-xs text-wrap font-display font-normal text-primary-600"
                    href={`mailto:${detail.Email}?subject=Request%20a%20Home%20Valuation`}
                  >
                    {detail.Email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-body-sm font-light text-neutral-900 decoration-primary-600 underline">
                    To speak to someone, call us on
                  </p>
                  <a
                    className="text-display-xs font-display font-normal text-primary-600"
                    href={`tel:${detail.Phone}`}
                  >
                    {detail.Phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="md:mt-20 my-10">
            <hr className="text-neutral-300"></hr>
          </div>
          <div className="flex lg:flex-row flex-col gap-8 lg:items-center justify-between mb-10">
            <div className="text-body-md font-light order-2 lg:order-1">
              © {new Date().getFullYear()} Puretime Property Purchasing Ltd.
              All Rights Reserved.{' '}
              <span className="inline-block relative cursor-pointer group">
                <a
                  href="https://www.termsfeed.com/live/4616b0ab-2778-4f40-8748-da90b0f5fdd1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 origin-left duration-700 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </span>
              <span className="mx-2">|</span>
              <span className="inline-block relative cursor-pointer group">
                <a
                  href="https://www.termsfeed.com/live/3288219f-0446-4f5b-a96d-715e41f260c1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </a>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 origin-left duration-700 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </span>
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center md:gap-6 gap-4 order-1 lg:order-2">
              <div className="flex flex-row items-center opacity-70">
                <p className="text-body-sm font-semibold tracking-widest text-neutral-700 pr-4">
                  CONNECT
                </p>
                <hr className="w-16 text-neutral-700"></hr>
              </div>
              <div className="flex flex-row  items-center gap-6">
                {data.allFooterJson.nodes[0].social?.map((node) => (
                  <a
                    href={node.href}
                    key={node.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="h-10 w-10"
                      src={node.icon.publicURL}
                      alt={node.name}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-black text-white">
        <div className="container mx-auto py-2 pl-4 text-right footer-text">
          <p className="text-body-xs">
            Website developed by{' '}
            <a
              href="https://github.com/ax99"
              className="text-primary-600 hover:text-primary-300  "
            >
              AX99
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
export default Footer
