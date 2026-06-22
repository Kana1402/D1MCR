import { ref, computed, onMounted } from 'vue'

// Interfaces de la Base de Datos
export interface Usuario {
  id_usuario: number
  nombre_completo: string
  correo: string
  rol: 'ADMIN' | 'USER'
  es_miembro_oficial: boolean
  fecha_registro: string
  estado: 'ACTIVO' | 'INACTIVO'
}

export interface Tematica {
  id_tematica: number
  nombre: string
  descripcion: string
  estado: 'ACTIVO' | 'INACTIVO'
}

export interface Proyecto {
  id_proyecto: number
  id_tematica: number | null
  titulo: string
  descripcion: string
  fecha_inicio: string
  fecha_fin: string
  estado: 'ACTIVO' | 'PASADO' | 'CANCELADO'
  fecha_creacion: string
}

export interface Asistencia {
  id_asistencia: number
  id_usuario: number
  id_proyecto: number
  fecha_inscripcion: string
  asistio: boolean
}

export interface Testimonio {
  id_testimonio: number
  id_usuario: number
  id_proyecto: number
  contenido: string
  url_video: string | null
  fecha_publicacion: string
  aprobado: boolean
}

export interface MiembroJunta {
  id_miembro: number
  nombre_completo: string
  cargo: string
  url_fotografia: string
  orden_jerarquia: number
}

export interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

// Estado compartido (Singleton en memoria o localStorage para pruebas reales)
const initialized = ref(false)
const users = ref<Usuario[]>([])
const thematics = ref<Tematica[]>([])
const projects = ref<Proyecto[]>([])
const attendances = ref<Asistencia[]>([])
const testimonials = ref<Testimonio[]>([])
const boardMembers = ref<MiembroJunta[]>([])
const toasts = ref<Toast[]>([])
const isLoading = ref(false)

let toastId = 0
export function addToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') {
  const id = ++toastId
  toasts.value.push({ id, type, message })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 4000)
}

function loadInitialData() {
  if (typeof window === 'undefined') return

  // Detectar cambio de versión de mocks para forzar sobrescritura
  const currentMockVersion = 'v3'
  const storedVersion = localStorage.getItem('d1m_mocks_version')
  const forceOverwrite = storedVersion !== currentMockVersion

  const storedUsers = localStorage.getItem('d1m_users')
  const storedThematics = localStorage.getItem('d1m_thematics')
  const storedProjects = localStorage.getItem('d1m_projects')
  const storedAttendances = localStorage.getItem('d1m_attendances')
  const storedTestimonials = localStorage.getItem('d1m_testimonials')
  const storedBoardMembers = localStorage.getItem('d1m_board_members')

  if (storedUsers && !forceOverwrite) users.value = JSON.parse(storedUsers)
  else {
    users.value = [
      { id_usuario: 1, nombre_completo: 'Administrador General', correo: 'admin@dale1mano.org', rol: 'ADMIN', es_miembro_oficial: true, fecha_registro: '2026-01-01T08:00:00Z', estado: 'ACTIVO' },
      { id_usuario: 2, nombre_completo: 'Ester Esquivel', correo: 'ester.esquivel@gmail.com', rol: 'USER', es_miembro_oficial: true, fecha_registro: '2026-02-15T10:00:00Z', estado: 'ACTIVO' },
      { id_usuario: 3, nombre_completo: 'Carmen Mendoza', correo: 'carmen.mendoza@hotmail.com', rol: 'USER', es_miembro_oficial: true, fecha_registro: '2026-02-20T11:30:00Z', estado: 'ACTIVO' },
      { id_usuario: 4, nombre_completo: 'Natalia Castro', correo: 'natalia.castro@outlook.com', rol: 'USER', es_miembro_oficial: false, fecha_registro: '2026-03-01T15:20:00Z', estado: 'ACTIVO' },
      { id_usuario: 5, nombre_completo: 'Orlando Carvajal Valdés', correo: 'orlando.carvajal@dale1mano.org', rol: 'ADMIN', es_miembro_oficial: true, fecha_registro: '2026-01-05T09:00:00Z', estado: 'ACTIVO' },
      { id_usuario: 6, nombre_completo: 'Erick Marín Muller', correo: 'erick.marin@dale1mano.org', rol: 'USER', es_miembro_oficial: true, fecha_registro: '2026-01-10T10:00:00Z', estado: 'ACTIVO' },
      { id_usuario: 7, nombre_completo: 'Keila Pérez Mendoza', correo: 'keila.perez@dale1mano.org', rol: 'USER', es_miembro_oficial: true, fecha_registro: '2026-01-12T10:00:00Z', estado: 'ACTIVO' }
    ]
    saveToStorage('d1m_users', users.value)
  }

  if (storedThematics && !forceOverwrite) thematics.value = JSON.parse(storedThematics)
  else {
    thematics.value = [
      { id_tematica: 1, nombre: 'Salud y bienestar', descripcion: 'Iniciativas enfocadas en el cuidado de la salud física y mental de la comunidad (charlas de bullying, sexualidad, psicología, Teen Smart).', estado: 'ACTIVO' },
      { id_tematica: 2, nombre: 'Educación', descripcion: 'Programas de refuerzo escolar comunitario, talleres de computación y campañas de útiles escolares.', estado: 'ACTIVO' },
      { id_tematica: 3, nombre: 'Ambiente', descripcion: 'Limpieza de ríos y playas locales, campañas de clasificación de desechos y reforestaciones.', estado: 'ACTIVO' },
      { id_tematica: 4, nombre: 'Justicia Social', descripcion: 'Foros de derechos de la juventud rural, talleres de equidad de género y actividades artísticas inclusivas.', estado: 'ACTIVO' },
      { id_tematica: 5, nombre: 'Empleabilidad', descripcion: 'Capacitaciones para el trabajo, elaboración de CV, simulaciones de entrevistas y emprendimiento.', estado: 'ACTIVO' }
    ]
    saveToStorage('d1m_thematics', thematics.value)
  }

  if (storedProjects && !forceOverwrite) projects.value = JSON.parse(storedProjects)
  else {
    projects.value = [
      { id_proyecto: 1, id_tematica: 1, titulo: 'Caminata sobre el Cáncer de Mama', descripcion: 'Marcha comunitaria de concientización y charlas informativas sobre detección temprana.', fecha_inicio: '2026-05-15T09:00:00Z', fecha_fin: '2026-05-15T13:00:00Z', estado: 'PASADO', fecha_creacion: '2026-04-10T08:00:00Z' },
      { id_proyecto: 2, id_tematica: 2, titulo: 'Donación de Útiles Escolares', descripcion: 'Campaña de inicio del curso lectivo para recolectar y entregar paquetes escolares.', fecha_inicio: '2026-02-10T08:00:00Z', fecha_fin: '2026-02-10T15:00:00Z', estado: 'PASADO', fecha_creacion: '2026-01-10T08:00:00Z' },
      { id_proyecto: 3, id_tematica: 3, titulo: 'Limpieza del Río Matina', descripcion: 'Jornada voluntaria para recolectar plásticos y desechos en las márgenes del río.', fecha_inicio: '2026-06-25T08:00:00Z', fecha_fin: '2026-06-25T12:00:00Z', estado: 'ACTIVO', fecha_creacion: '2026-06-01T10:00:00Z' },
      { id_proyecto: 4, id_tematica: 5, titulo: 'Taller de Currículum y Entrevistas', descripcion: 'Capacitación en elaboración de CV y simulaciones prácticas de entrevistas de trabajo.', fecha_inicio: '2026-06-28T14:00:00Z', fecha_fin: '2026-06-28T17:00:00Z', estado: 'ACTIVO', fecha_creacion: '2026-06-10T09:00:00Z' },
      { id_proyecto: 5, id_tematica: 4, titulo: 'Foro sobre Derechos de Juventud Rural', descripcion: 'Espacio de discusión política y social sobre los derechos y necesidades de los jóvenes de zonas rurales.', fecha_inicio: '2026-07-10T09:00:00Z', fecha_fin: '2026-07-10T14:00:00Z', estado: 'ACTIVO', fecha_creacion: '2026-06-15T08:00:00Z' }
    ]
    saveToStorage('d1m_projects', projects.value)
  }

  if (storedAttendances && !forceOverwrite) attendances.value = JSON.parse(storedAttendances)
  else {
    attendances.value = [
      { id_asistencia: 1, id_usuario: 2, id_proyecto: 1, fecha_inscripcion: '2026-05-01T10:00:00Z', asistio: true },
      { id_asistencia: 2, id_usuario: 3, id_proyecto: 1, fecha_inscripcion: '2026-05-02T11:00:00Z', asistio: true },
      { id_asistencia: 3, id_usuario: 4, id_proyecto: 1, fecha_inscripcion: '2026-05-05T15:30:00Z', asistio: false },
      { id_asistencia: 4, id_usuario: 6, id_proyecto: 1, fecha_inscripcion: '2026-05-10T09:00:00Z', asistio: true },
      
      { id_asistencia: 5, id_usuario: 2, id_proyecto: 2, fecha_inscripcion: '2026-01-20T10:00:00Z', asistio: true },
      { id_asistencia: 6, id_usuario: 4, id_proyecto: 2, fecha_inscripcion: '2026-01-21T11:00:00Z', asistio: true },
      { id_asistencia: 7, id_usuario: 7, id_proyecto: 2, fecha_inscripcion: '2026-01-25T14:00:00Z', asistio: true },

      { id_asistencia: 8, id_usuario: 2, id_proyecto: 3, fecha_inscripcion: '2026-06-05T08:00:00Z', asistio: false },
      { id_asistencia: 9, id_usuario: 3, id_proyecto: 3, fecha_inscripcion: '2026-06-08T10:15:00Z', asistio: false },
      
      { id_asistencia: 10, id_usuario: 4, id_proyecto: 4, fecha_inscripcion: '2026-06-12T12:00:00Z', asistio: false },
      { id_asistencia: 11, id_usuario: 7, id_proyecto: 4, fecha_inscripcion: '2026-06-14T14:20:00Z', asistio: false }
    ]
    saveToStorage('d1m_attendances', attendances.value)
  }

  if (storedTestimonials && !forceOverwrite) testimonials.value = JSON.parse(storedTestimonials)
  else {
    testimonials.value = [
      { id_testimonio: 1, id_usuario: 2, id_proyecto: 5, contenido: 'Ester nos cuenta su experiencia formando parte de los proyectos de desarrollo juvenil.', url_video: 'https://youtube.com/watch?v=8hygiLSmdPk', fecha_publicacion: '2026-03-01T10:00:00Z', aprobado: true },
      { id_testimonio: 2, id_usuario: 3, id_proyecto: 1, contenido: 'Impacto transformador y alcance de las misiones solidarias en la región.', url_video: 'https://youtube.com/watch?v=cySCggClpEw', fecha_publicacion: '2026-03-02T11:00:00Z', aprobado: true },
      { id_testimonio: 3, id_usuario: 4, id_proyecto: 2, contenido: 'Les compartimos este video sobre la ONG hecho por las estudiantes Natalia...', url_video: 'https://youtube.com/watch?v=Q9GUIcrlG4c', fecha_publicacion: '2026-03-03T12:00:00Z', aprobado: true },
      { id_testimonio: 4, id_usuario: 2, id_proyecto: 3, contenido: 'Me encantó participar en la jornada ambiental, es increíble ver cómo limpiando juntos hacemos un gran impacto.', url_video: null, fecha_publicacion: '2026-06-17T09:00:00Z', aprobado: false }
    ]
    saveToStorage('d1m_testimonials', testimonials.value)
  }

  if (storedBoardMembers && !forceOverwrite) boardMembers.value = JSON.parse(storedBoardMembers)
  else {
    boardMembers.value = [
      { id_miembro: 1, nombre_completo: 'Orlando Carvajal Valdés', cargo: 'Presidencia', url_fotografia: '/images/junta/Orlando.jpg', orden_jerarquia: 1 },
      { id_miembro: 2, nombre_completo: 'Erick Marín Muller', cargo: 'Tesoría', url_fotografia: '/images/junta/Erick.jpg', orden_jerarquia: 2 },
      { id_miembro: 3, nombre_completo: 'Keila Pérez Mendoza', cargo: 'Secretaría', url_fotografia: '/images/junta/Keila.jpg', orden_jerarquia: 3 },
      { id_miembro: 4, nombre_completo: 'María Fernanda Batista', cargo: 'Vocalías', url_fotografia: '/images/junta/María.jpg', orden_jerarquia: 4 },
      { id_miembro: 5, nombre_completo: 'Kihaveth Navarro Hernandez', cargo: 'Vocalía', url_fotografia: '/images/junta/Kihaveth.jpg', orden_jerarquia: 5 },
      { id_miembro: 6, nombre_completo: 'Susan Blanchard Blanchard', cargo: 'Fiscalía', url_fotografia: '/images/junta/Susan.jpg', orden_jerarquia: 6 }
    ]
    saveToStorage('d1m_board_members', boardMembers.value)
  }

  // Guardar la versión para evitar sobrescrituras en siguientes recargas
  localStorage.setItem('d1m_mocks_version', currentMockVersion)
  initialized.value = true
}

function saveToStorage(key: string, data: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

// Composable principal
export function useAdminData() {
  onMounted(() => {
    if (!initialized.value) {
      loadInitialData()
    }
  })

  // Acciones asíncronas simuladas con loading y toasts
  const simulateLoading = async (ms: number = 300) => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, ms))
    isLoading.value = false
  }

  // --- PROYECTOS CRUD ---
  const addProject = async (proj: Omit<Proyecto, 'id_proyecto' | 'fecha_creacion'>) => {
    await simulateLoading()
    const newId = projects.value.length ? Math.max(...projects.value.map(p => p.id_proyecto)) + 1 : 1
    const newProject: Proyecto = {
      ...proj,
      id_proyecto: newId,
      fecha_creacion: new Date().toISOString()
    }
    projects.value.unshift(newProject)
    saveToStorage('d1m_projects', projects.value)
    addToast('Proyecto creado correctamente.', 'success')
    return newProject
  }

  const editProject = async (id: number, updatedData: Partial<Proyecto>) => {
    await simulateLoading()
    const index = projects.value.findIndex(p => p.id_proyecto === id)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updatedData }
      saveToStorage('d1m_projects', projects.value)
      addToast('Proyecto actualizado correctamente.', 'success')
      return projects.value[index]
    }
    addToast('No se encontró el proyecto.', 'error')
    throw new Error('Proyecto no encontrado')
  }

  const changeProjectStatus = async (id: number, estado: Proyecto['estado']) => {
    await simulateLoading()
    const index = projects.value.findIndex(p => p.id_proyecto === id)
    if (index !== -1) {
      projects.value[index].estado = estado
      saveToStorage('d1m_projects', projects.value)
      addToast(`Estado del proyecto cambiado a ${estado}.`, 'info')
    }
  }

  // --- TEMATICAS CRUD ---
  const addTematica = async (tem: Omit<Tematica, 'id_tematica'>) => {
    await simulateLoading()
    const newId = thematics.value.length ? Math.max(...thematics.value.map(t => t.id_tematica)) + 1 : 1
    const newTem: Tematica = {
      ...tem,
      id_tematica: newId
    }
    thematics.value.push(newTem)
    saveToStorage('d1m_thematics', thematics.value)
    addToast('Temática creada correctamente.', 'success')
    return newTem
  }

  const editTematica = async (id: number, updatedData: Partial<Tematica>) => {
    await simulateLoading()
    const index = thematics.value.findIndex(t => t.id_tematica === id)
    if (index !== -1) {
      thematics.value[index] = { ...thematics.value[index], ...updatedData }
      saveToStorage('d1m_thematics', thematics.value)
      addToast('Temática actualizada correctamente.', 'success')
      return thematics.value[index]
    }
    addToast('No se encontró la temática.', 'error')
    throw new Error('Temática no encontrada')
  }

  const deleteTematica = async (id: number) => {
    await simulateLoading()
    // Filtrar y eliminar temática
    thematics.value = thematics.value.filter(t => t.id_tematica !== id)
    // Desasociar proyectos (poner id_tematica a null) de acuerdo con la restricción de BD (ON DELETE SET NULL)
    projects.value = projects.value.map(p => {
      if (p.id_tematica === id) {
        return { ...p, id_tematica: null }
      }
      return p
    })
    saveToStorage('d1m_thematics', thematics.value)
    saveToStorage('d1m_projects', projects.value)
    addToast('Temática eliminada correctamente.', 'info')
  }

  // --- USUARIOS ---
  const toggleUserStatus = async (id: number) => {
    await simulateLoading()
    const index = users.value.findIndex(u => u.id_usuario === id)
    if (index !== -1) {
      const u = users.value[index]
      u.estado = u.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
      saveToStorage('d1m_users', users.value)
      addToast(`Usuario ${u.nombre_completo} está ahora ${u.estado}.`, 'info')
    }
  }

  const promoteToOfficial = async (id: number) => {
    await simulateLoading()
    const index = users.value.findIndex(u => u.id_usuario === id)
    if (index !== -1) {
      users.value[index].es_miembro_oficial = true
      saveToStorage('d1m_users', users.value)
      addToast(`Usuario promovido a Miembro Oficial.`, 'success')
    }
  }

  const changeUserRole = async (id: number, rol: Usuario['rol']) => {
    await simulateLoading()
    const index = users.value.findIndex(u => u.id_usuario === id)
    if (index !== -1) {
      users.value[index].rol = rol
      saveToStorage('d1m_users', users.value)
      addToast(`Rol de usuario actualizado a ${rol}.`, 'info')
    }
  }

  // --- ASISTENCIAS ---
  const markAttendance = async (id_usuario: number, id_proyecto: number, asistio: boolean) => {
    // Sin carga lenta para clicks rápidos en listado
    const index = attendances.value.findIndex(a => a.id_usuario === id_usuario && a.id_proyecto === id_proyecto)
    if (index !== -1) {
      attendances.value[index].asistio = asistio
    } else {
      const newId = attendances.value.length ? Math.max(...attendances.value.map(a => a.id_asistencia)) + 1 : 1
      attendances.value.push({
        id_asistencia: newId,
        id_usuario,
        id_proyecto,
        fecha_inscripcion: new Date().toISOString(),
        asistio
      })
    }
    saveToStorage('d1m_attendances', attendances.value)
  }

  const enrollUserInProject = async (id_usuario: number, id_proyecto: number) => {
    await simulateLoading()
    if (attendances.value.some(a => a.id_usuario === id_usuario && a.id_proyecto === id_proyecto)) {
      addToast('El usuario ya se encuentra inscrito en este proyecto.', 'warning')
      return
    }
    const newId = attendances.value.length ? Math.max(...attendances.value.map(a => a.id_asistencia)) + 1 : 1
    attendances.value.push({
      id_asistencia: newId,
      id_usuario,
      id_proyecto,
      fecha_inscripcion: new Date().toISOString(),
      asistio: false
    })
    saveToStorage('d1m_attendances', attendances.value)
    addToast('Usuario inscrito en la actividad correctamente.', 'success')
  }

  // --- TESTIMONIOS ---
  const approveTestimonio = async (id: number) => {
    await simulateLoading()
    const index = testimonials.value.findIndex(t => t.id_testimonio === id)
    if (index !== -1) {
      testimonials.value[index].aprobado = true
      saveToStorage('d1m_testimonials', testimonials.value)
      addToast('Testimonio aprobado correctamente. Visible en la web.', 'success')
    }
  }

  const rejectTestimonio = async (id: number) => {
    await simulateLoading()
    testimonials.value = testimonials.value.filter(t => t.id_testimonio !== id)
    saveToStorage('d1m_testimonials', testimonials.value)
    addToast('Testimonio rechazado/eliminado.', 'info')
  }

  // --- JUNTA DIRECTIVA CRUD ---
  const addBoardMember = async (miembro: Omit<MiembroJunta, 'id_miembro'>) => {
    await simulateLoading()
    const newId = boardMembers.value.length ? Math.max(...boardMembers.value.map(b => b.id_miembro)) + 1 : 1
    const newMiembro: MiembroJunta = {
      ...miembro,
      id_miembro: newId
    }
    boardMembers.value.push(newMiembro)
    boardMembers.value.sort((a, b) => a.orden_jerarquia - b.orden_jerarquia)
    saveToStorage('d1m_board_members', boardMembers.value)
    addToast('Miembro de la junta directiva añadido.', 'success')
    return newMiembro
  }

  const editBoardMember = async (id: number, updatedData: Partial<MiembroJunta>) => {
    await simulateLoading()
    const index = boardMembers.value.findIndex(b => b.id_miembro === id)
    if (index !== -1) {
      boardMembers.value[index] = { ...boardMembers.value[index], ...updatedData }
      boardMembers.value.sort((a, b) => a.orden_jerarquia - b.orden_jerarquia)
      saveToStorage('d1m_board_members', boardMembers.value)
      addToast('Miembro de la junta directiva actualizado.', 'success')
      return boardMembers.value[index]
    }
    addToast('No se encontró el miembro.', 'error')
    throw new Error('Miembro no encontrado')
  }

  const deleteBoardMember = async (id: number) => {
    await simulateLoading()
    boardMembers.value = boardMembers.value.filter(b => b.id_miembro !== id)
    saveToStorage('d1m_board_members', boardMembers.value)
    addToast('Miembro eliminado de la junta directiva.', 'info')
  }

  // --- ESTADÍSTICAS DEL DASHBOARD ---
  const stats = computed(() => {
    const totalUsers = users.value.length
    const officialMembers = users.value.filter(u => u.es_miembro_oficial).length
    const activeProjects = projects.value.filter(p => p.estado === 'ACTIVO').length
    const passedProjects = projects.value.filter(p => p.estado === 'PASADO').length
    const cancelledProjects = projects.value.filter(p => p.estado === 'CANCELADO').length
    
    // Testimonios pendientes
    const pendingTestimonials = testimonials.value.filter(t => !t.aprobado).length

    // Asistencia promedio (asistio = true / total de asistencias de proyectos finalizados/pasados)
    const passedProjIds = projects.value.filter(p => p.estado === 'PASADO').map(p => p.id_proyecto)
    const totalAttendancesForPassed = attendances.value.filter(a => passedProjIds.includes(a.id_proyecto))
    const assistedPassed = totalAttendancesForPassed.filter(a => a.asistio).length
    
    const attendancePercentage = totalAttendancesForPassed.length 
      ? Math.round((assistedPassed / totalAttendancesForPassed.length) * 100) 
      : 0

    return {
      totalUsers,
      officialMembers,
      activeProjects,
      passedProjects,
      cancelledProjects,
      pendingTestimonials,
      attendancePercentage,
      totalEnrollments: attendances.value.length
    }
  })

  // Top 5 voluntarios
  const topVolunteers = computed(() => {
    const counts: Record<number, number> = {}
    
    // Sumar asistencias confirmadas
    attendances.value.forEach(a => {
      if (a.asistio) {
        counts[a.id_usuario] = (counts[a.id_usuario] || 0) + 1
      }
    })

    return Object.entries(counts)
      .map(([userIdStr, count]) => {
        const userId = parseInt(userIdStr)
        const user = users.value.find(u => u.id_usuario === userId)
        return {
          id_usuario: userId,
          nombre_completo: user ? user.nombre_completo : 'Usuario Desconocido',
          correo: user ? user.correo : '',
          es_miembro_oficial: user ? user.es_miembro_oficial : false,
          total_asistencias: count
        }
      })
      .sort((a, b) => b.total_asistencias - a.total_asistencias)
      .slice(0, 5)
  })

  return {
    users,
    thematics,
    projects,
    attendances,
    testimonials,
    boardMembers,
    toasts,
    isLoading,
    stats,
    topVolunteers,
    addToast,
    
    // Proyectos
    addProject,
    editProject,
    changeProjectStatus,

    // Temáticas
    addTematica,
    editTematica,
    deleteTematica,

    // Usuarios
    toggleUserStatus,
    promoteToOfficial,
    changeUserRole,

    // Asistencia
    markAttendance,
    enrollUserInProject,

    // Testimonios
    approveTestimonio,
    rejectTestimonio,

    // Junta Directiva
    addBoardMember,
    editBoardMember,
    deleteBoardMember
  }
}
