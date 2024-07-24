import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenerateCertificate = () => {
    const [certificateData, setCertificateData] = useState({
        participants: [],
        eventName: sessionStorage.getItem('eventName'),
        awardText: 'Best Performer Award',
        issuedBy: 'Anish S Nair',
        logoUrl: 'https://www.linkurcodes.com/images/logo.png',
        status: '',
    });

    useEffect(() => {
        const fetchCertificateData = async () => {
            const eventID = sessionStorage.getItem('eventViewID');
            const adminToken = sessionStorage.getItem('admintoken');

            if (!eventID || !adminToken) {
                console.error('Missing eventID or adminToken in sessionStorage');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8085/api/certificate/generate-certificate-user', {
                    event_id: eventID
                }, {
                    headers: {
                        token: adminToken
                    }
                });

                console.log('API Response:', response.data);

                const { status, message, participants } = response.data;

                if (status === 'success') {
                    setCertificateData(prevState => ({
                        ...prevState,
                        participants,
                        status: 'Certificates generated successfully'
                    }));
                } else if (status === 'no users') {
                    setCertificateData(prevState => ({
                        ...prevState,
                        status: message || 'No users registered for the event'
                    }));
                } else {
                    setCertificateData(prevState => ({
                        ...prevState,
                        status: message || 'Error generating certificates'
                    }));
                }
            } catch (error) {
                console.error('Error:', error);
                setCertificateData(prevState => ({
                    ...prevState,
                    status: 'Error generating certificates'
                }));
            }
        };

        fetchCertificateData();
    }, []);

    return (
        <div className="certificate-wrapper">
            <div className="certificate-container">
                <div className="background-design"></div>
                <div className="certificate-header">
                    <h1>Certificate of Appreciation</h1>
                    <p>This is to certify that</p>
                </div>
                {certificateData.participants.length > 0 ? (
                    certificateData.participants.map((participant, index) => (
                        <div className="certificate-body" key={index}>
                            <p className="participant-name">{participant.name}</p>
                            <p>has been honored with the</p>
                            <h2 className="award-text">{certificateData.awardText}</h2>
                            <p>in recognition of exceptional dedication, outstanding coding skills, and exemplary performance during</p>
                            <p>the {certificateData.eventName}.</p>
                            <div className="seal">
                                <img src="https://as2.ftcdn.net/v2/jpg/05/73/52/71/1000_F_573527119_rbHuW9W3uul5v7gh0IDG4DLi6nSw42yr.jpg" alt="Seal" />
                                <p>Best</p>
                            </div>
                            <div className="certificate-footer">
                                <div className="signature">
                                    <p>{certificateData.issuedBy}</p>
                                    <p>CEO, Link Ur Codes</p>
                                </div>
                            </div>
                            <div className="organization-logo">
                                <img src={certificateData.logoUrl} alt="Logo" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info" role="alert">
                        {certificateData.status || 'Generating certificates...'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateCertificate;

















// import React from 'react';


// const GenerateCertificate = () => {
//     return (
//         <div className="certificate-wrapper">
//             <div className="certificate-container">
//                 <div className="background-design"></div>
//                 <div className="certificate-header">
//                     <h1>Certificate of Appreciation</h1>
//                     <p>This is to certify that</p>
//                 </div>
//                 <div className="certificate-body">
//                     <p className="participant-name">Anila Joseph</p>
//                     <p>has been honored with the</p>
//                     <h2 className="award-text">Best Performer Award</h2>
//                     <p>in recognition of exceptional dedication, outstanding coding skills, and exemplary performance during</p>
//                     <p>the 8-day Google Flutter Full-stack Coding Bootcamp powered by Link Ur Codes at FISAT.</p>
//                     <div className="seal">
//                         <img src="data:image/png;base64,BASE64_STRING_FOR_SEAL_IMAGE" alt="Seal" />
//                         <p>Best</p>
//                     </div>
//                 </div>
//                 <div className="certificate-footer">
//                     <div className="signature">
//                         <p>Anish S Nair</p>
//                         <p>CEO, Link Ur Codes</p>
//                     </div>
//                 </div>
//                 <div className="organization-logo">
//                     <img src="https://www.linkurcodes.com/images/logo.png" alt="Logo" />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default GenerateCertificate;
