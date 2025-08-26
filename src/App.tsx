import { useState } from 'react';
import './app.css';

type Announcement = {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed';
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    const newA: Announcement = { id: Date.now(), title, description, status: 'active' };
    setAnnouncements((p) => [newA, ...p]);
    setTitle(''); setDescription('');
  };

  const setStatus = (id: number, status: 'active' | 'closed') =>
    setAnnouncements((p) => p.map(a => a.id === id ? { ...a, status } : a));

  return (
    <div className="page">
      <h1 className="h1">Create Announcement</h1>
      <form onSubmit={handleCreate} className="card">
        <label className="label">Title</label>
        <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder="Enter title" />
        <label className="label">Description</label>
        <textarea className="textarea" value={description} onChange={(e)=>setDescription(e.target.value)} required placeholder="Enter description" />
        <div style={{ marginTop: 12 }}>
          <button className="button" type="submit">Create</button>
        </div>
      </form>

      <h2 className="h1" style={{ marginTop: 24 }}>Announcements</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Title</th><th>Description</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign:'center', padding:16, color:'#6b7280', fontStyle:'italic' }}>No announcements yet</td></tr>
            ) : announcements.map(a => (
              <tr key={a.id} className="row">
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>
                  <select className="select" value={a.status} onChange={(e)=>setStatus(a.id, e.target.value as 'active'|'closed')}>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>
                  <button className="button" onClick={()=>alert(`Updated ${a.title} → ${a.status}`)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
