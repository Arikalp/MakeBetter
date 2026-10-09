# MakeBetter

## AI-Powered Road & Public Infrastructure Incident Reporting Platform

**Project README / System Design Document**

MakeBetter is a full-stack civic reporting platform where citizens can
upload photos of road and public-infrastructure incidents. A CNN-based
image classifier automatically categorizes the incident, the report is
geotagged and displayed on a Leaflet map, and government/admin users can
manage, update, resolve, and publicly communicate the status of reported
issues.

## 1. Project Vision

The goal is to create a transparent feedback loop between citizens and
public authorities:

**Report → AI Classify → Locate → Verify → Assign → Resolve → Publish
Progress**

The platform should make unresolved problems visible while also showing
completed government work to the public.

## 2. Core Features

  -----------------------------------------------------------------------
  Module                              Key functionality
  ----------------------------------- -----------------------------------
  Citizen Reporting                   Upload an incident image, add a
                                      description, capture/select a
                                      location, and submit a report.

  CNN Classification                  Analyze the uploaded image and
                                      predict an incident category such
                                      as pothole, accident,
                                      electrical/wiring issue,
                                      transformer damage, road
                                      obstruction, or other.

  Confidence & Review                 Store the predicted class and
                                      confidence score. Low-confidence
                                      predictions can be flagged for
                                      admin verification.

  Interactive Map                     Display incidents on a
                                      Leaflet/OpenStreetMap map using
                                      latitude and longitude, with
                                      category/status markers and popups.

  Public / Social Feed                Citizens can browse reported
                                      incidents, see progress, view
                                      resolved work, and interact through
                                      comments/reactions if enabled.

  Admin / Government Panel            View all incidents, filter by
                                      category/status/location, assign
                                      work, change priority, add remarks,
                                      and update resolution progress.

  Resolution Tracking                 Statuses such as Reported,
                                      Verified, Assigned, In Progress,
                                      Scheduled, Resolved, and Rejected.

  ETA / Commitment                    Admins can set an expected
                                      resolution date or number of days
                                      and update it when circumstances
                                      change.

  Transparency                        Resolved issues remain visible with
                                      before/after evidence and
                                      resolution details.
  -----------------------------------------------------------------------

## 3. Suggested Technology Stack

  -------------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- -------------------------
  Frontend                React.js + React Router Citizen portal, map,
                                                  social feed, admin
                                                  dashboard

  Styling                 Tailwind CSS / CSS      Responsive UI and
                                                  dashboard components

  Maps                    Leaflet + OpenStreetMap Incident visualization,
                                                  location selection, map
                                                  markers

  Backend                 Spring Boot             REST APIs,
                                                  authentication, business
                                                  logic, moderation, and
                                                  workflow

  Database                MongoDB                 Users, incidents, AI
                                                  predictions, comments,
                                                  status history, admin
                                                  actions

  AI / ML                 Python + CNN model      Image preprocessing and
                                                  incident classification

  Model                   MobileNetV3 /           Transfer-learning-based
                          EfficientNet / ResNet   image classification

  Image Storage           Cloudinary /            Store uploaded incident
                          S3-compatible object    images without bloating
                          storage                 MongoDB

  Authentication          Spring Security + JWT   Citizen/admin
                                                  authentication and
                                                  role-based access

  API Testing             Postman                 REST API development and
                                                  testing

  Version Control         Git + GitHub            Source control and
                                                  collaboration
  -------------------------------------------------------------------------

## 4. High-Level Architecture

A clean separation between the React client, Spring Boot API, MongoDB,
object storage, and AI inference service is recommended. The AI service
can initially run as a separate Python FastAPI service; this keeps model
dependencies isolated from the Java backend.

``` text
Citizen / Admin Browser
          |
          v
    React Frontend
          |
          | HTTPS / REST + JWT
          v
    Spring Boot Backend
       |       |       |
       |       |       +--> Image Storage (Cloudinary / S3)
       |       |
       |       +----------> AI Inference Service (Python + CNN)
       |
       +------------------> MongoDB
                              |
                              +--> Users
                              +--> Incidents
                              +--> AI Predictions
                              +--> Status History
                              +--> Comments / Reactions
```

## 5. Recommended Folder Structure

``` text
makebetter/
├── frontend/                     # React application
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── map/
│       │   ├── incident/
│       │   └── admin/
│       ├── pages/
│       │   ├── Home/
│       │   ├── ReportIncident/
│       │   ├── Map/
│       │   ├── Feed/
│       │   ├── IncidentDetails/
│       │   ├── Login/
│       │   └── admin/
│       ├── services/              # Axios/API clients
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── routes/
│       ├── App.jsx
│       └── main.jsx
├── backend/                      # Spring Boot REST API
│   └── src/main/
│       ├── java/com/makebetter/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── model/
│       │   ├── repository/
│       │   ├── service/
│       │   ├── security/
│       │   ├── exception/
│       │   └── MakeBetterApplication.java
│       └── resources/
│           └── application.properties
├── ai-service/                   # Python CNN inference service
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── preprocessing.py
│   │   ├── predictor.py
│   │   └── schemas.py
│   ├── models/
│   │   └── incident_classifier/
│   ├── training/
│   │   ├── train.py
│   │   ├── evaluate.py
│   │   └── dataset/
│   ├── requirements.txt
│   └── Dockerfile
├── docs/
│   ├── api/
│   ├── architecture/
│   └── database/
├── docker-compose.yml
├── README.md
└── .gitignore
```

## 6. Incident Categories

  -----------------------------------------------------------------------
  Category                            Examples
  ----------------------------------- -----------------------------------
  Pothole / Road Damage               Potholes, cracked road surface,
                                      damaged divider, broken footpath

  Accident                            Vehicle collision or visible road
                                      accident scene

  Electrical / Wiring                 Exposed wires, damaged poles,
                                      unsafe wiring

  Transformer Issue                   Transformer damage, smoke, fire,
                                      visible blast/damage

  Streetlight Issue                   Broken/non-functional streetlights
                                      or damaged fixtures

  Drainage / Waterlogging             Blocked drains, flooding, water
                                      accumulation

  Road Obstruction                    Debris, fallen tree, construction
                                      obstruction

  Other / Unknown                     Images outside the supported
                                      classes or low-confidence
                                      predictions
  -----------------------------------------------------------------------

## 7. CNN / AI Pipeline

Use transfer learning rather than training a deep CNN completely from
scratch. A pretrained model such as MobileNetV3, EfficientNet, or ResNet
can be fine-tuned on a labeled civic-incident dataset. MobileNetV3 is
particularly suitable if inference speed and lower infrastructure cost
matter.

``` text
Image Upload
    ↓
Image Validation + Resize / Normalize
    ↓
CNN / Transfer-Learning Model
    ↓
Predicted Category + Confidence
    ↓
Spring Boot stores prediction
    ↓
Admin verification when confidence is low
    ↓
Incident appears on map + public feed
```

## 8. Incident Data Model (MongoDB)

``` javascript
Incident {
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  aiPrediction: {
    label: String,
    confidence: Number,
    modelVersion: String
  },
  imageUrl: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  status: String,
  priority: String,
  reportedBy: ObjectId,
  assignedTo: ObjectId,
  expectedResolutionDate: Date,
  resolutionDescription: String,
  resolutionImageUrl: String,
  createdAt: Date,
  updatedAt: Date,
  statusHistory: [...]
}
```

## 9. User Roles

  -----------------------------------------------------------------------
  Role                                Permissions
  ----------------------------------- -----------------------------------
  Citizen                             Register/login, submit incidents,
                                      view map/feed, follow progress,
                                      comment/react where enabled.

  Admin / Government                  Review reports, verify AI
                                      classification, assign issues,
                                      update status, set priority/ETA,
                                      upload resolution evidence.

  Super Admin                         Manage government/admin accounts,
                                      categories, moderation rules, and
                                      platform-level settings.
  -----------------------------------------------------------------------

## 10. Main Workflow

1.  Citizen opens **Report Incident**.
2.  Citizen uploads an image and selects/captures the incident location.
3.  React sends the image and metadata to Spring Boot.
4.  Spring Boot stores the image in object storage and sends the image
    to the AI service.
5.  CNN returns a category and confidence score.
6.  Spring Boot creates the incident in MongoDB with status `REPORTED`.
7.  Admin sees the incident in the dashboard and can verify/correct the
    category.
8.  Admin assigns the issue and changes status to `ASSIGNED`,
    `IN_PROGRESS`, or `SCHEDULED`.
9.  Admin provides an expected resolution date or estimated number of
    days.
10. Once fixed, admin uploads resolution evidence and marks the incident
    `RESOLVED`.
11. The public feed and map show the updated status and resolution
    information.

## 11. Example REST API Design

### Authentication

``` http
POST /api/auth/register
POST /api/auth/login
```

### Incidents

``` http
POST   /api/incidents
GET    /api/incidents
GET    /api/incidents/{id}
PUT    /api/incidents/{id}
DELETE /api/incidents/{id}
GET    /api/incidents/map?category=POTHOLE&status=REPORTED
```

### Public Feed and Interactions

``` http
GET  /api/feed
POST /api/incidents/{id}/comments
POST /api/incidents/{id}/react
```

### Admin

``` http
GET  /api/admin/incidents
PUT  /api/admin/incidents/{id}/status
PUT  /api/admin/incidents/{id}/assign
PUT  /api/admin/incidents/{id}/eta
POST /api/admin/incidents/{id}/resolve
```

### AI

``` http
POST /api/ai/predict
```

## 12. Map Design

Leaflet can render OpenStreetMap tiles and incident markers using
latitude/longitude. Marker appearance can be driven by incident category
and status. The map should support:

-   Clustering when many reports exist.
-   Category/status filters.
-   A current-location option.
-   Click-through to the incident details page.

## 13. Admin Dashboard

Recommended dashboard sections:

-   Overview KPIs (total, unresolved, in progress, resolved).
-   Incident Table.
-   Map View.
-   Incident Detail.
-   Assignments.
-   Resolution Timeline.
-   Analytics.

Useful filters include category, status, priority, date range,
ward/area, and assigned department.

## 14. Important Engineering Considerations

-   **AI is an assistant, not the final authority.** Store confidence
    and allow admins to correct classifications.
-   **Do not store large binary images directly in MongoDB.** Prefer
    object storage and keep only URLs/metadata in MongoDB.
-   **Validate uploads.** Restrict MIME types, file size, dimensions,
    and potentially scan uploads before storage.
-   **Protect admin APIs.** Use Spring Security, JWT, role-based
    authorization, and audit logs.
-   **Location privacy.** Avoid exposing unnecessary personal
    information and consider approximate public location for sensitive
    reports.
-   **Model versioning.** Store `modelVersion` with every prediction so
    later model changes remain traceable.
-   **Moderation.** Public feeds need spam, abuse, duplicate-report, and
    inappropriate-image handling.
-   **Duplicate detection.** A future enhancement can compare new
    reports by image similarity and nearby coordinates to reduce
    duplicate incidents.

## 15. Suggested Development Phases

  -----------------------------------------------------------------------
  Phase                               Deliverable
  ----------------------------------- -----------------------------------
  Phase 1 --- Foundation              React + Spring Boot + MongoDB
                                      setup, authentication, base UI, API
                                      structure.

  Phase 2 --- Reporting               Image upload, incident creation,
                                      location capture, MongoDB
                                      persistence.

  Phase 3 --- Map                     Leaflet integration, markers,
                                      filters, incident details.

  Phase 4 --- AI                      Dataset preparation, CNN transfer
                                      learning, Python inference API,
                                      confidence score.

  Phase 5 --- Admin                   Government dashboard, assignment,
                                      status workflow, ETA, and
                                      resolution evidence.

  Phase 6 --- Social Feed             Public feed, comments/reactions,
                                      resolved-work posts, moderation.

  Phase 7 --- Production              Dockerization, deployment,
                                      monitoring, security hardening, and
                                      testing.
  -----------------------------------------------------------------------

## 16. Future Enhancements

-   Duplicate incident detection using image embeddings and geospatial
    proximity.
-   Computer vision for severity estimation in addition to category
    classification.
-   Department-specific routing: road, electricity, water, sanitation,
    traffic, etc.
-   SMS/email/push notifications when incident status changes.
-   Heatmaps showing areas with unusually high incident density.
-   SLA analytics: average resolution time by category/department/area.
-   Citizen reputation or verified-report mechanisms to reduce spam.
-   Before/after image comparison for resolved incidents.
-   Multilingual UI and voice-assisted reporting.

------------------------------------------------------------------------

**Project positioning:** This project combines full-stack development,
geospatial visualization, computer vision, role-based workflows, and
public-service transparency. It is well suited as a substantial
portfolio/capstone project because each subsystem can be demonstrated
independently while forming one coherent end-to-end product.
