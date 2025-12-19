
import React, { useState, useEffect } from 'react';
import { Lock, X, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, EncryptionStatus } from '../types';

const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: '東京大浮世絵展', 
    category: '3D Visual', 
    imageUrl: './works/01/thumb.jpg', 
    isLocked: false,
    description: "丸ビルで行われたプロジェクションマッピングでは、3D制作部分を担当しました。",
    galleryImages: ['./works/01/1.jpg', './works/01/2.jpg']
  },
  { 
    id: '2', 
    title: '〈クレ・ド・ポー ボーテ〉POP UP', 
    category: 'Event Visual', 
    imageUrl: './works/02/thumb.jpg', 
    isLocked: false,
    description: "麻布台ヒルズで開催されたCPBイベントでは、インスタレーションの3D演出部分を担当しました。",
    galleryImages: ['./works/02/1.jpg', './works/02/2.jpg']
  },
  { 
    id: '3', 
    title: 'Kenji Sakai 展示', 
    category: 'Installation', 
    imageUrl: './works/03/thumb.jpg', 
    isLocked: false,
    description: "Nomadic GalleryでのKenji Sakai氏个展では、インスタレーションのインストールおよびインタラクティブ演出部分を担当しました。",
    galleryImages: ['./works/03/1.jpg', './works/03/2.jpg']
  },
  { 
    id: '4', 
    title: '万博インスタレーション', 
    category: 'Spatial Design', 
    imageUrl: './works/04/thumb.jpg', 
    isLocked: true,
    description: "东北大学の研究プロジェクトでは、脳波インタラクション装置におけるビジュアル演出部分を担当しました。",
    galleryImages: ['./works/04/1.jpg', './works/04/2.jpg']
  },
  { 
    id: '5', 
    title: 'イマーシブフォート', 
    category: '3D Production', 
    imageUrl: './works/05/thumb.jpg', 
    isLocked: true,
    description: "イマーシブフォートのリブランディングプロジェクトでは、ポスター用3Dタイポグラフィ部分を担当しました。",
    galleryImages: ['./works/05/1.jpg']
  },
  { 
    id: '6', 
    title: 'QUALITY 1st', 
    category: 'Product Visual', 
    imageUrl: './works/06/thumb.jpg', 
    isLocked: true,
    description: "Quality 1stのプロモーションコンテンツでは、3D制作部分を担当しました。",
    galleryImages: ['./works/06/1.jpg', './works/06/2.jpg']
  },
  { 
    id: '7', 
    title: 'FENDI HOLIDAY', 
    category: 'Digital Art', 
    imageUrl: './works/07/thumb.jpg', 
    isLocked: true,
    description: "FENDI 2025 Holiday企画では、3Dアニメーション部分を担当しました。",
    galleryImages: ['./works/07/1.jpg', './works/07/2.jpg']
  },
  { 
    id: '8', 
    title: 'UFO x Zone', 
    category: '3D Fabrication', 
    imageUrl: './works/08/thumb.jpg', 
    isLocked: true,
    description: "UFOXZONEのプロジェクトでは、ランドタオルや3Dプリントなどの実体物制作部分を担当しました。",
    galleryImages: ['./works/08/1.jpg']
  },
  { 
    id: '9', 
    title: 'Baycurrent Party 2025', 
    category: 'Real-time Graphics', 
    imageUrl: './works/09/thumb.jpg', 
    isLocked: true,
    description: "Tokyo Domeで開催されたBayCurrentのYear End Partyでは、アーティスト演出におけるビジュアル演出部分を担当しました。",
    galleryImages: ['./works/09/1.jpg', './works/09/2.jpg']
  }
];

const SafeImage: React.FC<{ src: string, alt: string, className: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-node-surface text-node-muted ${className}`}>
        <ImageOff className="w-5 h-5 mb-2 opacity-20" />
        <span className="text-[7px] font-mono opacity-40 uppercase tracking-tighter">Image Missing</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

const EncryptedPortfolio: React.FC = () => {
  const [status, setStatus] = useState<EncryptionStatus>(EncryptionStatus.LOCKED);
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '4040') {
      setStatus(EncryptionStatus.UNLOCKED);
    } else {
      setStatus(EncryptionStatus.ERROR);
      setTimeout(() => setStatus(EncryptionStatus.LOCKED), 1000);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const images = selectedProject.galleryImages || [selectedProject.imageUrl];
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const images = selectedProject.galleryImages || [selectedProject.imageUrl];
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (selectedProject) {
      setCurrentImgIndex(0);
    }
  }, [selectedProject]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {PROJECTS.map((project) => {
          const isHidden = project.isLocked && status !== EncryptionStatus.UNLOCKED;
          return (
            <div 
              key={project.id}
              onClick={() => !isHidden && setSelectedProject(project)}
              className={`group relative aspect-[4/5] bg-node-surface overflow-hidden transition-all duration-700 ${!isHidden ? 'cursor-pointer hover:shadow-xl' : ''}`}
            >
              <div className={`w-full h-full transition-all duration-1000 ${isHidden ? 'blur-3xl opacity-30 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}>
                <SafeImage src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-node-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[7px] font-mono tracking-widest text-node-muted uppercase mb-1">{project.category}</p>
                <h3 className="text-[11px] md:text-xs font-light tracking-tight leading-snug">{project.title}</h3>
              </div>
              {isHidden && (
                <div className="absolute inset-0 flex items-center justify-center p-4 bg-node-bg/10 backdrop-blur-md">
                  <div className="text-center w-full max-w-[120px]">
                    <Lock className="w-2.5 h-2.5 mx-auto mb-4 opacity-20" />
                    <form onSubmit={handleUnlock} className="border-b border-node-text/20 pb-1">
                      <input 
                        type="password" 
                        placeholder="CODE: 4040" 
                        className="bg-transparent border-none outline-none text-[7px] font-mono w-full text-center tracking-[0.4em] uppercase placeholder:opacity-20"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </form>
                    {status === EncryptionStatus.ERROR && <p className="text-[5px] font-mono text-red-400 mt-1 uppercase">Denied</p>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-16">
          <div className="absolute inset-0 bg-node-bg/95 backdrop-blur-xl" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-[1200px] h-full md:h-[80vh] bg-node-bg shadow-2xl flex flex-col md:flex-row overflow-hidden border border-node-text/[0.05]">
            <div className="flex-1 relative overflow-hidden bg-node-surface/5 flex items-center justify-center group/gallery">
              <SafeImage 
                src={(selectedProject.galleryImages || [selectedProject.imageUrl])[currentImgIndex]} 
                alt={selectedProject.title} 
                className="max-w-[85%] max-h-[85%] object-contain shadow-2xl transition-all duration-700" 
              />
              {(selectedProject.galleryImages?.length || 0) > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-6 p-4 opacity-20 hover:opacity-100 transition-opacity"><ChevronLeft className="w-6 h-6 stroke-[1px]" /></button>
                  <button onClick={nextImage} className="absolute right-6 p-4 opacity-20 hover:opacity-100 transition-opacity"><ChevronRight className="w-6 h-6 stroke-[1px]" /></button>
                </>
              )}
            </div>
            <div className="w-full md:w-[380px] p-10 flex flex-col justify-between bg-node-bg border-l border-node-text/[0.05]">
              <div>
                <button onClick={() => setSelectedProject(null)} className="mb-12 opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2 group">
                  <X className="w-3 h-3 group-hover:rotate-90 transition-transform"/>
                  <span className="text-[8px] font-mono uppercase tracking-widest">CLOSE</span>
                </button>
                <div className="space-y-8">
                  <div>
                    <p className="text-[7px] font-mono tracking-[0.6em] text-node-muted uppercase mb-3 opacity-40">Project Archive</p>
                    <h2 className="text-2xl font-light tracking-tight leading-tight">{selectedProject.title}</h2>
                  </div>
                  <div className="w-8 h-[1px] bg-node-text/10"></div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-bold tracking-widest uppercase text-node-muted">{selectedProject.category}</p>
                    <p className="text-[11px] leading-relaxed text-node-text/70 font-light tracking-wide">{selectedProject.description}</p>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-node-text/[0.05] text-[7px] font-mono opacity-20 uppercase tracking-[0.4em]">Node // Archive 2025</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncryptedPortfolio;
