import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Register from "./Register";
const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div  className="container" >
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">{content}</h1>
    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
  </div>
</div>

      <section id="feature">
        <div className="container">
          <div className="row">

            <div className="col-md-4 col-sm-4">
              <div className="feature-thumb">
                <span>01</span>
                <h3>Trending Courses</h3>
                <p>Known is free education HTML Bootstrap Template. You can modify in any way and use this for your website.</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div className="feature-thumb">
                <span>02</span>
                <h3>Books & Library</h3>
                <p>You are allowed to use Known HTML Template for your commercial or non-commercial websites.</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div className="feature-thumb">
                <span>03</span>
                <h3>Certified Teachers</h3>
                <p>Please spread a word about us. Template redistribution is NOT allowed on any download website.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <!-- ABOUT --> */}
     <div id="about">
          <div class="container">
               <div class="row">

                    <div class="col-md-6 col-sm-12">
                         <div class="about-info">
                              <h2>Start your journey to a better life with online practical courses</h2>

                              <figure>
                                   <span><i class="fa fa-users"></i></span>
                                   <figcaption>
                                        <h3>Professional Trainers</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                   </figcaption>
                              </figure>

                              <figure>
                                   <span><i class="fa fa-certificate"></i></span>
                                   <figcaption>
                                        <h3>International Certifications</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                   </figcaption>
                              </figure>

                              <figure>
                                   <span><i class="fa fa-bar-chart-o"></i></span>
                                   <figcaption>
                                        <h3>Free for 3 months</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                   </figcaption>
                              </figure>
                         </div>
                    </div>
                    <Register/>
                    {/* <div class="col-md-offset-1 col-md-4 col-sm-12">
                         <div class="entry-form">
                              <form action="#" method="post">
                                <h2>Signup today</h2>
                                <input type="text" name="full name" class="form-control" placeholder="Full name" required=""></input>

                                <input type="email" name="email" class="form-control" placeholder="Your email address" required=""></input>

                                <input type="password" name="password" class="form-control" placeholder="Your password" required=""></input>

                                <button class="submit-btn form-control" id="form-submit">Get started</button>
                              </form>
                         </div>
                    </div> */}

               </div>
          </div>
     </div>
     
    
</div>
      
  );
};

export default Home;