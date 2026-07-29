import { useState } from 'react'
import { LangProvider } from './context/lang'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import People from './pages/People'
import PersonDetail from './pages/PersonDetail'
import Services from './pages/Services'
import Media from './pages/Media'
import MediaDetail from './pages/MediaDetail'
import Jobs from './pages/Jobs'
import Contact from './pages/Contact'

export type PageState =
  | { id: 'home' }
  | { id: 'story' }
  | { id: 'projects'; filter?: string }
  | { id: 'project-detail'; slug: string }
  | { id: 'people' }
  | { id: 'person-detail'; slug: string }
  | { id: 'services' }
  | { id: 'media'; category?: string }
  | { id: 'media-detail'; slug: string }
  | { id: 'jobs' }
  | { id: 'contact' }

export default function App() {
  const [page, setPage] = useState<PageState>({ id: 'home' })

  const navigate = (newPage: PageState) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  const renderPage = () => {
    switch (page.id) {
      case 'home':
        return <Home navigate={navigate} />
      case 'story':
        return <OurStory navigate={navigate} />
      case 'projects':
        return <Projects navigate={navigate} initialFilter={page.filter} />
      case 'project-detail':
        return <ProjectDetail slug={page.slug} navigate={navigate} />
      case 'people':
        return <People navigate={navigate} />
      case 'person-detail':
        return <PersonDetail slug={page.slug} navigate={navigate} />
      case 'services':
        return <Services navigate={navigate} />
      case 'media':
        return <Media navigate={navigate} initialCategory={page.category} />
      case 'media-detail':
        return <MediaDetail slug={page.slug} navigate={navigate} />
      case 'jobs':
        return <Jobs navigate={navigate} />
      case 'contact':
        return <Contact navigate={navigate} />
      default:
        return <Home navigate={navigate} />
    }
  }

  return (
    <LangProvider>
      <div className="min-h-screen bg-white text-[#212529]">
        <Nav currentPage={page.id} navigate={navigate} />
        <main>{renderPage()}</main>
        <Footer navigate={navigate} />
      </div>
    </LangProvider>
  )
}
