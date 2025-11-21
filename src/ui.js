/**
 * UI 渲染与交互模块
 * UI Rendering & Interaction Module
 */

/**
 * 渲染任务卡片
 * @param {Object} task - 任务对象
 * @returns {HTMLElement} 任务卡片元素
 */
export function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.taskId = task.id;
    
    // 如果有冲突，添加冲突类
    if (task.conflicts && task.conflicts.length > 0) {
        card.classList.add('conflict');
    }
    
    // 设置优先级颜色
    const priorityColor = getPriorityColor(task.priority);
    card.style.setProperty('--priority-color', priorityColor);
    
    // 格式化日期显示
    const dateStr = formatDateDisplay(task.date);
    
    card.innerHTML = `
        <div class="task-header">
            <h3 class="task-title">${escapeHtml(task.name)}</h3>
            <div class="task-actions">
                <button class="action-btn edit" data-action="edit" aria-label="编辑">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="action-btn delete" data-action="delete" aria-label="删除">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="task-meta">
            <div class="task-time">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${dateStr} ${task.startTime} - ${task.endTime}</span>
            </div>
            <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
        </div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        ${task.conflicts && task.conflicts.length > 0 ? `
            <div class="task-conflict-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                时间冲突 (${task.conflicts.length} 个)
            </div>
        ` : ''}
    `;
    
    return card;
}

/**
 * 渲染任务列表
 * @param {Array} tasks - 任务列表
 * @param {Function} onEdit - 编辑回调
 * @param {Function} onDelete - 删除回调
 */
export function renderTaskList(tasks, onEdit, onDelete) {
    const container = document.getElementById('tasksContainer');
    const emptyState = document.getElementById('emptyState');
    
    // 清空容器
    container.innerHTML = '';
    
    if (tasks.length === 0) {
        // 显示空状态
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    // 隐藏空状态
    container.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // 渲染任务卡片
    tasks.forEach(task => {
        const card = createTaskCard(task);
        container.appendChild(card);
        
        // 绑定编辑按钮事件
        const editBtn = card.querySelector('[data-action="edit"]');
        if (editBtn) {
            editBtn.addEventListener('click', () => onEdit(task));
        }
        
        // 绑定删除按钮事件
        const deleteBtn = card.querySelector('[data-action="delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm(`确定要删除任务 "${task.name}" 吗？`)) {
                    onDelete(task.id);
                }
            });
        }
    });
}

/**
 * 更新统计信息
 * @param {number} total - 总任务数
 * @param {number} conflicts - 冲突任务数
 */
export function updateStats(total, conflicts) {
    const totalCountEl = document.getElementById('totalCount');
    const conflictCountEl = document.getElementById('conflictCount');
    
    if (totalCountEl) {
        totalCountEl.textContent = total;
    }
    
    if (conflictCountEl) {
        conflictCountEl.textContent = conflicts;
    }
}

/**
 * 更新视图标题
 * @param {string} title - 标题文本
 */
export function updateViewTitle(title) {
    const titleEl = document.getElementById('viewTitle');
    if (titleEl) {
        titleEl.textContent = title;
    }
}

/**
 * 更新导航按钮状态
 * @param {string} activeView - 当前激活的视图
 */
export function updateNavButtons(activeView) {
    const navButtons = document.querySelectorAll('.nav-btn[data-view]');
    navButtons.forEach(btn => {
        if (btn.dataset.view === activeView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * 格式化日期显示
 * @param {string} dateStr - 日期字符串 (YYYY-MM-DD)
 * @returns {string} 格式化后的日期
 */
function formatDateDisplay(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // 重置时间为 0 以便比较日期
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
        return '今天';
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
        return '明天';
    } else {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const weekday = weekdays[date.getDay()];
        return `${month}月${day}日 ${weekday}`;
    }
}

/**
 * 获取优先级颜色
 * @param {string} priority - 优先级
 * @returns {string} 颜色值
 */
function getPriorityColor(priority) {
    const colorMap = {
        'P1': '#ff6b6b',
        'P2': '#4ecdc4',
        'P3': '#95e1d3'
    };
    return colorMap[priority] || '#95e1d3';
}

/**
 * HTML 转义
 * @param {string} text - 原始文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 初始化导出菜单
 * @param {Function} onExportJSON - JSON 导出回调
 * @param {Function} onExportMarkdown - Markdown 导出回调
 */
export function initExportMenu(onExportJSON, onExportMarkdown) {
    const exportBtn = document.getElementById('exportBtn');
    const exportMenu = document.getElementById('exportMenu');
    
    if (!exportBtn || !exportMenu) return;
    
    // 切换导出菜单显示
    exportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = exportMenu.style.display !== 'none';
        exportMenu.style.display = isVisible ? 'none' : 'block';
    });
    
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!exportMenu.contains(e.target) && e.target !== exportBtn) {
            exportMenu.style.display = 'none';
        }
    });
    
    // 绑定导出选项
    const jsonOption = exportMenu.querySelector('[data-format="json"]');
    const markdownOption = exportMenu.querySelector('[data-format="markdown"]');
    
    if (jsonOption) {
        jsonOption.addEventListener('click', () => {
            onExportJSON();
            exportMenu.style.display = 'none';
        });
    }
    
    if (markdownOption) {
        markdownOption.addEventListener('click', () => {
            onExportMarkdown();
            exportMenu.style.display = 'none';
        });
    }
}

