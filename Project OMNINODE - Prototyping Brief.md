# **Project OMNINODE: Prototype Development Brief**

## **Welcome to the Team\!**

Hey everyone. We are building **Project OMNINODE**—a decentralized, offline-first educational network designed to bring AI-driven learning to off-grid communities.

Millions of kids and adults lack access to quality education simply because they don't have a reliable internet connection or a stable power grid. We are going to build a functional prototype that bypasses these issues completely by bringing the server, the AI, and the content directly to the edge.

Our goal for this semester/sprint is to build **ONE to THREE fully functional prototype nodes** and test them locally. If we get this right, we have a working MVP (Minimum Viable Product) that we can pitch for grants, hackathons, or NGO partnerships.

## **What Exactly Are We Building?**

For this prototyping phase, we are combining three core pieces of technology into a single ecosystem:

### **1\. The Offline Wi-Fi Hub (The Hardware)**

We will build a microserver using a Raspberry Pi. It will be powered by a small solar panel/power bank combo. This node will broadcast a local, offline Wi-Fi intranet (around 50-100 meters). Anyone who connects to it with a phone or laptop will be redirected to our custom, locally hosted web dashboard.

### **2\. The Edge AI Grading App (The Software)**

We will build a companion mobile app for teachers/volunteers. Using the phone's camera, the app will use on-device OCR (Optical Character Recognition) to read handwritten student assignments. It will process the text locally, grade the answers using a lightweight logic model, and sync that data back to the local Wi-Fi Hub to generate the student's next lesson.

### **3\. The SMS/USSD Micro-Learning Loop**

We will program an automated text-message loop to send short, interactive math and literacy riddles to basic feature phones. We'll build a simple prototype using a cloud SMS API (like Twilio) or a local GSM module attached to our hardware to simulate how older adults would interact with the system.

## **Team Roles & Responsibilities**

To get this prototype working, we are splitting the work into four main tracks. Here is who is doing what:

**1\. Hardware & Embedded Systems Lead**

* **The Mission:** Get the physical box working.  
* **Tasks:** Set up the Raspberry Pi. Configure the local Wi-Fi access point (Captive Portal) so users are automatically routed to our dashboard. Wire up the battery and solar charging module. Stress-test the network to see how many devices can connect at once.

**2\. Frontend Web & Mobile Developer**

* **The Mission:** Build an ultra-fast, minimalist interface.  
* **Tasks:** Develop the web dashboard hosted on the node. Because users might connect with very old smartphones, the UI must have *zero* bloat—no heavy graphics, simple transparent backgrounds, and lightning-fast load times. You will also help build the basic mobile app interface for the teacher’s grading tool.

**3\. Edge Machine Learning (ML) Engineer**

* **The Mission:** Make AI work offline.  
* **Tasks:** Find and compress a lightweight OCR model (e.g., using TensorFlow Lite) that can run locally on a smartphone to read handwriting. Write the Python/Node logic that takes that text, grades it based on a 2-mark/5-mark rubric, and updates the local database.

**4\. Content, UI/UX & Testing Lead**

* **The Mission:** Make the system actually teach people.  
* **Tasks:** Curate the initial batch of sample videos and PDFs to host on the node. Design the USSD/SMS text-adventure scripts (e.g., transitioning from Telugu/Hindi to English progressively). You will also design the standardized paper worksheets that the AI needs to scan.

## **Prototyping Timeline (8-12 Week Sprint)**

* **Phase 1 (Weeks 1-3): The Foundation**  
  * *Hardware:* Get the Pi broadcasting an offline network.  
  * *Software:* Deploy a basic "Hello World" webpage on the local server. Set up the development environment for the OCR app.  
* **Phase 2 (Weeks 4-7): The Core Features**  
  * *Hardware:* Integrate the battery/solar loop.  
  * *Software:* Build out the full minimalist web dashboard. Get the mobile app to successfully scan a handwritten page and convert it to text locally.  
  * *Content:* Write and test the SMS/USSD script logic.  
* **Phase 3 (Weeks 8-10): Integration & The AI Loop**  
  * Connect the mobile app to the local Wi-Fi node database. Ensure the scanned grade updates the web dashboard automatically.  
* **Phase 4 (Weeks 11-12): Stress Testing**  
  * Put everything in a plastic enclosure. Take it outside, run it on battery power, connect 10 of our own phones to it, and try to break the system. Fix the bugs.

## **Next Steps**

1. **Claim your track:** Decide which of the 4 roles fits your skills best.  
2. **Inventory Check:** Let's pool together what we already have (old Raspberry Pis, spare solar banks, Android phones for testing).  
3. **Start Building:** We will set up our GitHub repository and initial meeting schedule this week. Let's build something that matters\!