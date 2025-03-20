import React from "react";
import { Link } from "react-router-dom";

const BlogDetailsLayer = () => {
  return (
      <div className='row gy-4'>
        <div className='col-lg-8'>
          <div className='card p-0 radius-12 overflow-hidden'>
            <div className='card-body p-0'>
              <img
                  src='assets/images/blog/crypto-trends-2024.png'
                  alt='Crypto Market Trends'
                  className='w-100 h-100 object-fit-cover'
              />
              <div className='p-32'>
                <div className='d-flex align-items-center gap-16 justify-content-between flex-wrap mb-24'>
                  <div className='d-flex align-items-center gap-8'>
                    <img
                        src='assets/images/experts/crypto-expert.png'
                        alt='Crypto Expert'
                        className='w-48-px h-48-px rounded-circle object-fit-cover'
                    />
                    <div className='d-flex flex-column'>
                      <h6 className='text-lg mb-0'>Alexandra Crypto</h6>
                      <span className='text-sm text-neutral-500'>Blockchain Analyst</span>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-md-3 gap-2 flex-wrap'>
                    <div className='d-flex align-items-center gap-8 text-neutral-500 text-lg fw-medium'>
                      <i className='ri-chat-3-line' />
                      23 Comments
                    </div>
                    <div className='d-flex align-items-center gap-8 text-neutral-500 text-lg fw-medium'>
                      <i className='ri-calendar-2-line' />
                      Jan 17, 2024
                    </div>
                  </div>
                </div>
                <h3 className='mb-16'>
                  The Future of Cryptocurrency: Trends to Watch in 2024
                </h3>
                <p className='text-neutral-500 mb-16'>
                  The cryptocurrency landscape continues to evolve rapidly, with 2024 poised to be
                  a breakthrough year for blockchain technology. Major developments in decentralized
                  finance (DeFi), non-fungible tokens (NFTs), and regulatory frameworks are reshaping
                  the financial ecosystem. Bitcoin's recent halving event and Ethereum's transition
                  to proof-of-stake consensus mechanism have significantly impacted market dynamics.
                </p>
                <p className='text-neutral-500 mb-16'>
                  Blockchain technology is finding new applications beyond financial services.
                  Supply chain management, healthcare record systems, and digital identity verification
                  are leveraging distributed ledger technology for enhanced security and transparency.
                  The emergence of zero-knowledge proofs and layer-2 scaling solutions is addressing
                  long-standing challenges around transaction privacy and network scalability.
                </p>
                <p className='text-neutral-500 mb-16'>
                  Central bank digital currencies (CBDCs) are gaining momentum globally, with over
                  130 countries currently exploring their implementation. This development raises
                  important questions about financial sovereignty and the balance between centralized
                  control and decentralized networks. Meanwhile, decentralized autonomous organizations
                  (DAOs) are redefining corporate governance structures, enabling community-driven
                  decision-making through smart contracts.
                </p>
              </div>
            </div>
          </div>
          <div className='card mt-24'>
            <div className='card-header border-bottom'>
              <h6 className='text-xl mb-0'>Community Discussion</h6>
            </div>
            <div className='card-body p-24'>
              <div className='comment-list d-flex flex-column'>
                <div className='comment-list__item'>
                  <div className='d-flex align-items-start gap-16'>
                    <div className='flex-shrink-0'>
                      <img
                          src='assets/images/users/defi-user.png'
                          alt='DeFi Enthusiast'
                          className='w-60-px h-60-px rounded-circle object-fit-cover'
                      />
                    </div>
                    <div className='flex-grow-1 border-bottom pb-40 mb-40 border-dashed'>
                      <h6 className='text-lg mb-4'>DeFiMaximalist</h6>
                      <span className='text-neutral-500 text-sm'>
                      Jan 21, 2024 at 11:25 pm
                    </span>
                      <p className='text-neutral-600 text-md my-16'>
                        Great overview! What's your take on the recent cross-chain bridge hacks?
                        How can we improve security in DeFi protocols while maintaining
                        interoperability between different blockchains?
                      </p>
                      <div className='d-flex align-items-center gap-8'>
                        <Link
                            href='#'
                            className='btn btn-sm btn-danger-600 d-flex align-items-center gap-1 text-xxs px-8 py-6'
                        >
                          <i className='ri-heart-3-line text-xs line-height-1' />
                          Like
                        </Link>
                        <Link
                            href='#comment-form'
                            className='btn btn-sm btn-primary-600 d-flex align-items-center gap-1 text-xxs px-8 py-6'
                        >
                          <i className='ri-reply-line text-xs line-height-1' />
                          Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='comment-list__item ms--48'>
                  <div className='d-flex align-items-start gap-16'>
                    <div className='flex-shrink-0'>
                      <img
                          src='assets/images/users/nft-creator.png'
                          alt='NFT Artist'
                          className='w-60-px h-60-px rounded-circle object-fit-cover'
                      />
                    </div>
                    <div className='flex-grow-1 border-bottom pb-40 mb-40 border-dashed'>
                      <h6 className='text-lg mb-4'>CryptoArtist</h6>
                      <span className='text-neutral-500 text-sm'>
                      Jan 21, 2024 at 11:25 pm
                    </span>
                      <p className='text-neutral-600 text-md my-16'>
                        The NFT section was insightful! How do you see the integration of
                        AI-generated art affecting the NFT market? Are there any blockchain
                        platforms specifically catering to AI artists?
                      </p>
                      <div className='d-flex align-items-center gap-8'>
                        <Link
                            href='#'
                            className='btn btn-sm btn-danger-600 d-flex align-items-center gap-1 text-xxs px-8 py-6'
                        >
                          <i className='ri-heart-3-line text-xs line-height-1' />
                          Like
                        </Link>
                        <Link
                            href='#comment-form'
                            className='btn btn-sm btn-primary-600 d-flex align-items-center gap-1 text-xxs px-8 py-6'
                        >
                          <i className='ri-reply-line text-xs line-height-1' />
                          Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* More crypto-focused comments... */}
              </div>
            </div>
          </div>
          <div className='card mt-24' id='comment-form'>
            {/* Comment form remains same structure */}
          </div>
        </div>
        {/* Crypto-focused Sidebar */}
        <div className='col-lg-4'>
          <div className='d-flex flex-column gap-24'>
            <div className='card'>
              <div className='card-header border-bottom'>
                <h6 className='text-xl mb-0'>Search Crypto Topics</h6>
              </div>
              <div className='card-body p-24'>
                <form className='position-relative'>
                  <input
                      type='text'
                      className='form-control border border-neutral-200 radius-8 ps-40'
                      name='search'
                      placeholder='Search blockchain topics...'
                  />
                  <iconify-icon
                      icon='ion:search-outline'
                      className='icon position-absolute positioned-icon top-50 translate-middle-y'
                  />
                </form>
              </div>
            </div>
            <div className='card'>
              <div className='card-header border-bottom'>
                <h6 className='text-xl mb-0'>Latest Crypto Posts</h6>
              </div>
              <div className='card-body d-flex flex-column gap-24 p-24'>
                <div className='d-flex flex-wrap'>
                  <Link
                      to='/blog-details'
                      className='blog__thumb w-100 radius-12 overflow-hidden'
                  >
                    <img
                        src='assets/images/blog/smart-contracts.png'
                        alt='Smart Contracts'
                        className='w-100 h-100 object-fit-cover'
                    />
                  </Link>
                  <div className='blog__content'>
                    <h6 className='mb-8'>
                      <Link
                          to='/blog-details'
                          className='text-line-2 text-hover-primary-600 text-md transition-2'
                      >
                        Smart Contract Security: Best Practices for Developers
                      </Link>
                    </h6>
                    <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                      Exploring secure coding practices and audit procedures for
                      blockchain developers working with Ethereum and Solidity.
                    </p>
                  </div>
                </div>
                {/* More crypto posts... */}
              </div>
            </div>
            <div className='card'>
              <div className='card-header border-bottom'>
                <h6 className='text-xl mb-0'>Blockchain Categories</h6>
              </div>
              <div className='card-body p-24'>
                <ul>
                  <li className='w-100 d-flex align-items-center justify-content-between flex-wrap gap-8 border-bottom border-dashed pb-12 mb-12'>
                    <Link
                        to='/blog'
                        className='text-hover-primary-600 transition-2'
                    >
                      DeFi Protocols
                    </Link>
                    <span className='text-neutral-500 w-28-px h-28-px rounded-circle bg-neutral-100 d-flex justify-content-center align-items-center transition-2 text-xs fw-semibold'>
                    47
                  </span>
                  </li>
                  {/* More categories... */}
                </ul>
              </div>
            </div>
            <div className='card'>
              <div className='card-header border-bottom'>
                <h6 className='text-xl mb-0'>Crypto Tags</h6>
              </div>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center flex-wrap gap-8'>
                  <Link
                      to='/blog'
                      className='btn btn-sm btn-primary-600 bg-primary-50 bg-hover-primary-600 text-primary-600 border-0 d-inline-flex align-items-center gap-1 text-sm px-16 py-6'
                  >
                    Bitcoin Halving
                  </Link>
                  <Link
                      to='/blog'
                      className='btn btn-sm btn-primary-600 bg-primary-50 bg-hover-primary-600 text-primary-600 border-0 d-inline-flex align-items-center gap-1 text-sm px-16 py-6'
                  >
                    Ethereum 2.0
                  </Link>
                  {/* More tags... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BlogDetailsLayer;