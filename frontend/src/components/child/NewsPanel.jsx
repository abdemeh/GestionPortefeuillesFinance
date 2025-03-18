import React from 'react';
import { Link } from "react-router-dom";
const NewsPanel = () => {
    return (
        <div className='card'>
                    <div className='card-header border-bottom'>
                      <h6 className='text-xl mb-0'>News</h6>
                    </div>
                    <div className='card-body d-flex flex-column gap-24 p-24'>
                      <div className='d-flex flex-wrap'>
                        <Link
                          to='/blog-details'
                          className='blog__thumb w-100 radius-12 overflow-hidden'
                        >
                          <img
                            src='assets/images/blog/blog5.png'
                            alt=''
                            className='w-100 h-100 object-fit-cover'
                          />
                        </Link>
                        <div className='blog__content'>
                          <h6 className='mb-8'>
                            <Link
                              to='/blog-details'
                              className='text-line-2 text-hover-primary-600 text-md transition-2'
                            >
                              How to hire a right business executive for your company
                            </Link>
                          </h6>
                          <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Omnis dolores explicabo corrupti, fuga necessitatibus fugiat
                            adipisci quidem eveniet enim minus.
                          </p>
                        </div>
                      </div>
                      <div className='d-flex flex-wrap'>
                        <Link
                          to='/blog-details'
                          className='blog__thumb w-100 radius-12 overflow-hidden'
                        >
                          <img
                            src='assets/images/blog/blog6.png'
                            alt=''
                            className='w-100 h-100 object-fit-cover'
                          />
                        </Link>
                        <div className='blog__content'>
                          <h6 className='mb-8'>
                            <Link
                              to='/blog-details'
                              className='text-line-2 text-hover-primary-600 text-md transition-2'
                            >
                              The Gig Economy: Adapting to a Flexible Workforce
                            </Link>
                          </h6>
                          <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Omnis dolores explicabo corrupti, fuga necessitatibus fugiat
                            adipisci quidem eveniet enim minus.
                          </p>
                        </div>
                      </div>
                      <div className='d-flex flex-wrap'>
                        <Link
                          to='/blog-details'
                          className='blog__thumb w-100 radius-12 overflow-hidden'
                        >
                          <img
                            src='assets/images/blog/blog7.png'
                            alt=''
                            className='w-100 h-100 object-fit-cover'
                          />
                        </Link>
                        <div className='blog__content'>
                          <h6 className='mb-8'>
                            <Link
                              to='/blog-details'
                              className='text-line-2 text-hover-primary-600 text-md transition-2'
                            >
                              The Future of Remote Work: Strategies for Success
                            </Link>
                          </h6>
                          <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Omnis dolores explicabo corrupti, fuga necessitatibus fugiat
                            adipisci quidem eveniet enim minus.
                          </p>
                        </div>
                      </div>
                      <div className='d-flex flex-wrap'>
                        <Link
                          to='/blog-details'
                          className='blog__thumb w-100 radius-12 overflow-hidden'
                        >
                          <img
                            src='assets/images/blog/blog6.png'
                            alt=''
                            className='w-100 h-100 object-fit-cover'
                          />
                        </Link>
                        <div className='blog__content'>
                          <h6 className='mb-8'>
                            <Link
                              to='/blog-details'
                              className='text-line-2 text-hover-primary-600 text-md transition-2'
                            >
                              Lorem ipsum dolor sit amet consectetur adipisicing.
                            </Link>
                          </h6>
                          <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Omnis dolores explicabo corrupti, fuga necessitatibus fugiat
                            adipisci quidem eveniet enim minus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
    );
};

export default NewsPanel;