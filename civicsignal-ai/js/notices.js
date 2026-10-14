/**
 * CivicSignal AI - Notice Storage & Data Manager
 * Handles localStorage operations, search/filtering, and CRUD actions for demo public notices.
 */

const STORAGE_KEY = 'civicsignal_notices_v2';

const NoticeStore = {
  /**
   * Initializes the store with default data if localStorage is empty or corrupted.
   * @returns {Array} List of notices
   */
  init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.resetDefaults();
        return this.getAll();
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        this.resetDefaults();
        return this.getAll();
      }
      return parsed;
    } catch (err) {
      console.warn("CivicSignal: Corrupted localStorage data, resetting to defaults", err);
      this.resetDefaults();
      return this.getAll();
    }
  },

  /**
   * Returns all notices from storage.
   * @returns {Array}
   */
  getAll() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("CivicSignal: Error reading notices from localStorage", err);
      return [];
    }
  },

  /**
   * Returns only published notices for public citizen view.
   * @returns {Array}
   */
  getPublished() {
    return this.getAll().filter(notice => notice.published !== false);
  },

  /**
   * Finds a notice by ID.
   * @param {string} id
   * @returns {Object|null}
   */
  getById(id) {
    const notices = this.getAll();
    return notices.find(n => n.id === id) || null;
  },

  /**
   * Saves notice array to localStorage safely.
   * @param {Array} notices
   */
  save(notices) {
    try {
      if (!Array.isArray(notices)) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    } catch (err) {
      console.error("CivicSignal: Error saving to localStorage", err);
    }
  },

  /**
   * Adds a new notice.
   * @param {Object} notice
   * @returns {Object} Added notice
   */
  addNotice(notice) {
    const notices = this.getAll();
    const newNotice = {
      ...notice,
      id: notice.id || `cs-${Date.now()}`,
      issuedDate: notice.issuedDate || new Date().toISOString().split('T')[0],
      published: notice.published !== undefined ? notice.published : true
    };
    notices.unshift(newNotice);
    this.save(notices);
    return newNotice;
  },

  /**
   * Updates an existing notice's status.
   * @param {string} id
   * @param {string} newStatus 'active' | 'upcoming' | 'completed'
   * @returns {boolean} Success
   */
  updateStatus(id, newStatus) {
    const notices = this.getAll();
    const index = notices.findIndex(n => n.id === id);
    if (index === -1) return false;
    notices[index].status = newStatus;
    this.save(notices);
    return true;
  },

  /**
   * Toggles visibility/published state of a notice.
   * @param {string} id
   * @returns {boolean} New published state
   */
  togglePublished(id) {
    const notices = this.getAll();
    const index = notices.findIndex(n => n.id === id);
    if (index === -1) return false;
    notices[index].published = !notices[index].published;
    this.save(notices);
    return notices[index].published;
  },

  /**
   * Deletes a notice by ID.
   * @param {string} id
   * @returns {boolean}
   */
  deleteNotice(id) {
    const notices = this.getAll();
    const filtered = notices.filter(n => n.id !== id);
    if (filtered.length === notices.length) return false;
    this.save(filtered);
    return true;
  },

  /**
   * Resets localStorage back to the initial sample demo notices.
   */
  resetDefaults() {
    // Deep clone DEFAULT_NOTICES to prevent mutation
    const clone = JSON.parse(JSON.stringify(DEFAULT_NOTICES));
    this.save(clone);
    return clone;
  },

  /**
   * Filters and sorts public notices according to query criteria.
   * @param {Object} options
   * @param {string} [options.category='all']
   * @param {string} [options.status='all']
   * @param {string} [options.searchQuery='']
   * @param {string} [options.sortBy='newest']
   * @param {boolean} [options.includeUnpublished=false]
   * @returns {Array} Filtered notices
   */
  queryNotices({
    category = 'all',
    status = 'all',
    searchQuery = '',
    sortBy = 'newest',
    includeUnpublished = false
  } = {}) {
    let list = includeUnpublished ? this.getAll() : this.getPublished();

    // Filter by Category
    if (category && category !== 'all') {
      list = list.filter(n => (n.category || '').toLowerCase() === category.toLowerCase());
    }

    // Filter by Status
    if (status && status !== 'all') {
      list = list.filter(n => (n.status || '').toLowerCase() === status.toLowerCase());
    }

    // Filter by Search Query (searches across titles, summaries, departments, locations, actions, references)
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(n => {
        const titleEn = (n.title?.en || '').toLowerCase();
        const titleTe = (n.title?.te || '').toLowerCase();
        const summaryEn = (n.summary?.en || '').toLowerCase();
        const summaryTe = (n.summary?.te || '').toLowerCase();
        const deptEn = (n.department?.en || '').toLowerCase();
        const deptTe = (n.department?.te || '').toLowerCase();
        const ref = (n.referenceNumber || '').toLowerCase();
        const locEn = Array.isArray(n.locations?.en) ? n.locations.en.join(' ').toLowerCase() : '';
        const locTe = Array.isArray(n.locations?.te) ? n.locations.te.join(' ').toLowerCase() : '';
        const actsEn = Array.isArray(n.actions?.en) ? n.actions.en.join(' ').toLowerCase() : '';
        const actsTe = Array.isArray(n.actions?.te) ? n.actions.te.join(' ').toLowerCase() : '';
        const origEn = (n.originalText?.en || '').toLowerCase();
        const origTe = (n.originalText?.te || '').toLowerCase();

        return (
          titleEn.includes(q) ||
          titleTe.includes(q) ||
          summaryEn.includes(q) ||
          summaryTe.includes(q) ||
          deptEn.includes(q) ||
          deptTe.includes(q) ||
          ref.includes(q) ||
          locEn.includes(q) ||
          locTe.includes(q) ||
          actsEn.includes(q) ||
          actsTe.includes(q) ||
          origEn.includes(q) ||
          origTe.includes(q)
        );
      });
    }

    // Sort by Date
    list.sort((a, b) => {
      const dateA = new Date(a.issuedDate || '1970-01-01').getTime();
      const dateB = new Date(b.issuedDate || '1970-01-01').getTime();
      return sortBy === 'oldest' ? dateA - dateB : dateB - dateA;
    });

    return list;
  },

  /**
   * Computes aggregate statistics for dashboard badges directly from current data.
   * @returns {Object}
   */
  getStats() {
    const notices = this.getAll();
    const published = notices.filter(n => n.published !== false);
    const active = published.filter(n => n.status === 'active').length;
    const upcoming = published.filter(n => n.status === 'upcoming').length;

    // Collect unique locations
    const locationsSet = new Set();
    published.forEach(n => {
      if (Array.isArray(n.locations?.en)) {
        n.locations.en.forEach(l => locationsSet.add(l.trim()));
      }
    });

    return {
      total: published.length,
      active: active,
      upcoming: upcoming,
      locationsCount: locationsSet.size,
      languagesCount: 2 // English and Telugu
    };
  }
};
