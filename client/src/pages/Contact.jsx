const Contact = () => {
    return (
        <div className="container mb-4">
            <section>
                <h2 className="h1-responsive font-weight-bold text-center my-4 text-success">Contact us</h2>
                <p className="text-center w-responsive mx-auto mb-4">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</p>
                <div className="row">
                    <div className="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <div className="md-form form-floating my-2 mb-md-0">
                                        <input type="text" id="name" name="name" className="form-control" />
                                        <label htmlFor="name" className="">Your name</label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="md-form form-floating my-2 mb-md-0">
                                        <input type="text" id="email" name="email" className="form-control" />
                                        <label htmlFor="email" className="">Your email</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-md-12">
                                    <div className="md-form form-floating my-2 mb-md-0">
                                        <input type="text" id="subject" name="subject" className="form-control" />
                                        <label htmlFor="subject" className="">Subject</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-md-12">
                                    <div className="md-form form-floating my-2 mb-md-0">
                                        <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                        <label htmlFor="message">Your message</label>
                                    </div>
                                </div>
                            </div>

                        </form>

                        <div className="text-center text-md-left mt-3">
                            <a className="btn btn-success">Send</a>
                        </div>
                        <div className="status"></div>
                    </div>

                    <div className="col-md-3 text-center mt-4 d-none d-md-block">
                        <ul className="list-unstyled mb-0">
                            <li><i className="fas fa-map-marker-alt fa-2x text-success"></i>
                                <p>Charlotte, NC 28210</p>
                            </li>

                            <li><i className="fas fa-phone mt-4 fa-2x text-success"></i>
                                <p>704 555 5555</p>
                            </li>

                            <li><i className="fas fa-envelope mt-4 fa-2x text-success"></i>
                                <p>contact@gitfix.dev</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
