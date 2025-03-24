import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

export default function InteractiveFormApp() {
  const [formData, setFormData] = useState({
    room_name: "",
    ip_address: "",
    port_number: "",
    tech_initials: "",
    client_name: "",
    client_title: "",
    technician_name: "",
    technician_title: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const clientSigRef = useRef();
  const techSigRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      ...formData,
      client_signature: clientSigRef.current.getTrimmedCanvas().toDataURL("image/png"),
      technician_signature: techSigRef.current.getTrimmedCanvas().toDataURL("image/png"),
    };

    const response = await fetch("http://localhost:8000/generate-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "room_readiness_form.xlsx";
    a.click();
    setSubmitting(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Room Readiness Form</h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Room Name/Number"
        name="room_name"
        value={formData.room_name}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="IP Address"
        name="ip_address"
        value={formData.ip_address}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Port Number"
        name="port_number"
        value={formData.port_number}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Technician Initials (CAPS)"
        name="tech_initials"
        value={formData.tech_initials}
        onChange={handleChange}
      />

      <h2 className="font-semibold mt-4">Client Signature</h2>
      <SignatureCanvas ref={clientSigRef} penColor="black" canvasProps={{ className: "border w-full h-24" }} />
      <input
        className="w-full p-2 border rounded mt-2"
        placeholder="Client Name"
        name="client_name"
        value={formData.client_name}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Client Title"
        name="client_title"
        value={formData.client_title}
        onChange={handleChange}
      />

      <h2 className="font-semibold mt-4">Technician Signature</h2>
      <SignatureCanvas ref={techSigRef} penColor="black" canvasProps={{ className: "border w-full h-24" }} />
      <input
        className="w-full p-2 border rounded mt-2"
        placeholder="Technician Name"
        name="technician_name"
        value={formData.technician_name}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Technician Title"
        name="technician_title"
        value={formData.technician_title}
        onChange={handleChange}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Generating..." : "Submit & Download Form"}
      </Button>
    </div>
  );
}