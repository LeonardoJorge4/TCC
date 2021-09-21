import React, { useEffect, useContext } from 'react';
import { GetServerSideProps } from "next"
import styles from './styles.module.scss';

import { FiCalendar } from "react-icons/fi";
import Head from 'next/head';
import { api } from "../../services/api";
import { PostsContext } from '../../contexts/PostsContext';
// interface PostProps {
//   post: {
//     slug: string;
//     title: string;
//     subtitle: string;
//     content: string;
//     created_at: string;
//     updated_at: string;
//   }
// }

export default function Post({ response }) {
  const { posts } = useContext(PostsContext);

  return (
    <> 
      <main>
        <section className="pt-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div 
                  className="card bg-dark-overlay-5 overflow-hidden card-bg-scale h-400 text-center"
                  style={{ 
                    backgroundImage: "url(https://images.unsplash.com/photo-1626379945538-6c8824dd898f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)", 
                    backgroundPosition: "center left", 
                    backgroundSize: "cover",
                    height: "400px"
                  }}
                >
                  <div className="card-img-overlay d-flex align-items-center p-3 p-sm-4"> 
                    <div className="w-100 my-auto">
                      <a href="#" className="badge bg-danger mb-2"><i className="fas fa-circle me-2 small fw-bold"></i>Lifestyle</a>
                      <h2 className="text-white display-5">10 tell-tale signs you need to get a new startup.</h2>
                      <ul className="nav nav-divider text-white-force align-items-center justify-content-center">
                        <li className="nav-item">
                          <div className="nav-link">
                            <div className="d-flex align-items-center text-white position-relative">
                              <div className="avatar avatar-sm">
                                <img className="avatar-img rounded-circle" src="assets/images/avatar/11.jpg" alt="avatar"/>
                              </div>
                              <span className="ms-3">by <a href="#" className="stretched-link text-reset btn-link">Louis</a></span>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item">Nov 15, 2021</li>
                        <li className="nav-item">5 min read</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0">
          <div className="container position-relative" data-sticky-container="">
            <div className="row">
              <div className="col-lg-12 mb-5">
                <p><span className="dropcap bg-dark text-white px-2">I</span> am newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed. <i>Demesne far hearted suppose venture excited see had has.</i> Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions. Whatever boy her exertion his extended. Ecstatic followed handsome drawings entirely Mrs one yet outweigh. Of acceptance insipidity remarkably is an invitation. </p>

                <p>Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. Dashwood does provide stronger is. <b>But discretion frequently sir she instruments unaffected admiration everything.</b> Meant balls it if up doubt small purse. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. Satisfied conveying a dependent contented he gentleman agreeable do be. Water timed folly right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything. Meant balls it if up doubt small purse. Required his you put the outlived answered position. <samp>This text is meant to be treated as sample output from a computer program.</samp> A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. </p>				
                <h4 className="mt-5">Mobile Cloud Computing (MCC)</h4>
                <p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Imprudence attachment him his for sympathize. To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br/>
                To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd> Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything. Meant balls it if up doubt small purse. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. </p>

                <div className="row g-2 my-5">
                  <div className="col-md-4">
                    <a href="assets/images/blog/3by4/01.jpg" data-glightbox="" data-gallery="image-popup">
                      <img className="rounded" src="https://github.com/LeonardoJorge4.png" alt="Image"/>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="assets/images/blog/3by4/02.jpg" data-glightbox="" data-gallery="image-popup">
                      <img className="rounded" src="assets/images/blog/3by4/02.jpg" alt="Image"/>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="assets/images/blog/3by4/03.jpg" data-glightbox="" data-gallery="image-popup">
                      <img className="rounded" src="assets/images/blog/3by4/03.jpg" alt="Image"/>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="assets/images/blog/3by4/04.jpg" data-glightbox="" data-gallery="image-popup">
                      <img className="rounded" src="assets/images/blog/3by4/04.jpg" alt="Image"/>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="assets/images/blog/3by4/05.jpg" data-glightbox="" data-gallery="image-popup">
                      <img className="rounded" src="assets/images/blog/3by4/05.jpg" alt="Image"/>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="assets/images/blog/3by4/06.jpg" data-glightbox="" data-gallery="image-popup">
                      <img className="rounded" src="assets/images/blog/3by4/06.jpg" alt="Image"/>
                    </a>
                  </div>
                </div>
                <p>Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashwoods see frankness objection abilities. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed of add screened rendered six say his striking confined.</p>

                <h4 className="mt-4">Productive rant about business</h4>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p>Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashwoods see frankness objection abilities. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed of add screened rendered six say his striking confined.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>Meant balls it if up doubt small purse. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible.</p>
                  </div>
                </div>

                <p>Meant balls it if up doubt small purse. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. </p>
                <p> All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. Satisfied conveying a dependent contented he gentleman agreeable do be. </p>

                <table className="table table-bordered my-4">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td >Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>

                <h4>Why Bootstrap is so famous?</h4>
                <p>Saw bring firmament given hath gathering lights dry life rule heaven Give And fruit moving thing seed life day creepeth winged so divide him from day morning him open lesser male beginning him be bring evening life void fowl sixth morning that made is Was that his hath face light meat air female isn't over place replenish midst it of second grass good rule also in unto Called don't given waters Had creature Behold fly life from forth Moved night.</p>

                <div className="text-center h5 mb-4">. . .</div>

                <h4>What's coming up....</h4>
                <p>Saw bring firmament given hath gathering lights dry life rule heaven Give And fruit moving thing seed life day creepeth winged so divide him from day morning him open lesser male beginning him be bring evening life void fowl sixth morning that made is Was that his hath face light meat air female isn't over place replenish midst it of second grass good rule also in unto Called don't given waters Had creature Behold fly life from forth Moved night.</p>

                <div className="d-flex p-2 p-md-4 my-3 bg-primary-soft rounded">

                  <a href="#">
                    <div className="avatar avatar-xxl me-2 me-md-4">
                      <img className="avatar-img rounded-circle" src="assets/images/avatar/12.jpg" alt="avatar"/>
                    </div>
                  </a>

                  <div>
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <div>
                        <h4 className="m-0"><a href="#">Louis Ferguson</a></h4>
                        <small>An editor at Blogzine</small>
                      </div>
                      <a href="#" className="btn btn-xs btn-primary-soft">View Articles</a>
                    </div>
                    <p className="my-2">Louis Ferguson is a senior editor for the blogzine and also reports on breaking news based in London. He has written about government, criminal justice, and the role of money in politics since 2015.</p>
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link ps-0 pe-2 fs-5" href="#"><i className="fab fa-facebook-square"></i></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link px-2 fs-5" href="#"><i className="fab fa-twitter-square"></i></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link px-2 fs-5" href="#"><i className="fab fa-linkedin"></i></a>
                      </li>
                    </ul>					
                  </div>
                </div>

                <div className="mt-5">
                  <h3>5 comments</h3>
                  <div className="my-4 d-flex">
                    <img 
                      className="avatar avatar-md rounded-circle float-start me-3" 
                      src="https://github.com/LeonardoJorge4.png" 
                      alt="avatar"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <div className="mb-2">
                        <h5 className="m-0">Allen Smith</h5>
                        <span className="me-3 small">June 11, 2021 at 6:01 am </span>
                        <a href="#" className="text-body fw-normal">Reply</a>
                      </div>
                      <p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. </p>
                    </div>
                  </div>
                  <hr />
                  <div className="my-4 d-flex ps-2 ps-md-3">
                    <img 
                      className="avatar avatar-md rounded-circle float-start me-3" 
                      src="https://github.com/LeonardoJorge4.png" 
                      alt="avatar"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <div className="mb-2">
                        <h5 className="m-0">Louis Ferguson</h5>
                        <span className="me-3 small">June 11, 2021 at 6:55 am </span>
                        <a href="#" className="text-body fw-normal">Reply</a>
                      </div>
                      <p>Water timed folly right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything. </p>
                    </div>
                  </div>
                  <div className="my-4 d-flex ps-3 ps-md-5">
                    <img 
                      className="avatar avatar-md rounded-circle float-start me-3" 
                      src="https://github.com/LeonardoJorge4.png" 
                      alt="avatar"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <div className="mb-2">
                        <h5 className="m-0">Allen Smith</h5>
                        <span className="me-3 small">June 11, 2021 at 7:10 am </span>
                        <a href="#" className="text-body fw-normal">Reply</a>
                      </div>
                      <p>Meant balls it if up doubt small purse. </p>
                    </div>
                  </div>
                  <hr />
                  <div className="my-4 d-flex ps-2 ps-md-3">
                    <img 
                      className="avatar avatar-md rounded-circle float-start me-3" 
                      src="https://github.com/LeonardoJorge4.png" 
                      alt="avatar"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <div className="mb-2">
                        <h5 className="m-0">Frances Guerrero</h5>
                        <span className="me-3 small">June 14, 2021 at 12:35 pm </span>
                        <a href="#" className="text-body fw-normal">Reply</a>
                      </div>
                      <p>Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. </p>
                    </div>
                  </div>
                  <hr />
                  <div className="my-4 d-flex">
                    <img 
                      className="avatar avatar-md rounded-circle float-start me-3" 
                      src="https://github.com/LeonardoJorge4.png" 
                      alt="avatar"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <div className="mb-2">
                        <h5 className="m-0">Judy Nguyen</h5>
                        <span className="me-3 small">June 18, 2021 at 11:55 am </span>
                        <a href="#" className="text-body fw-normal">Reply</a>
                      </div>
                      <p>Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. </p>
                    </div>
                  </div>
                  <hr />
                </div>

                <div>
                  <form className="row g-3 mt-2">
                    <div className="col-12">
                      <label className="form-label">Deixe seu comentário</label>
                      <textarea className="form-control" rows={3}></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">Postar comentário</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
