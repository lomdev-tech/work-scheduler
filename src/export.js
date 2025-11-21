/**
 * 导出功能模块
 * Export Functionality Module
 */

/**
 * 导出为 JSON 格式
 * @param {Array} tasks - 任务列表
 */
export function exportToJSON(tasks) {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `work-scheduler-${formatDateForFilename(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

/**
 * 导出为 Markdown 格式
 * @param {Array} tasks - 任务列表
 */
export function exportToMarkdown(tasks) {
    const sortedTasks = sortTasksByDate(tasks);
    const groupedTasks = groupTasksByDate(sortedTasks);
    
    let markdown = '# 工作日程安排\n\n';
    markdown += `导出时间: ${formatDate(new Date())}\n\n`;
    markdown += `总计: ${tasks.length} 个任务\n\n`;
    markdown += '---\n\n';
    
    // 按日期分组输出
    Object.keys(groupedTasks).forEach(date => {
        markdown += `## ${formatDate(new Date(date))}\n\n`;
        
        groupedTasks[date].forEach(task => {
            const priorityEmoji = getPriorityEmoji(task.priority);
            const conflictBadge = task.conflicts && task.conflicts.length > 0 ? ' ⚠️ 冲突' : '';
            
            markdown += `### ${priorityEmoji} ${task.name}${conflictBadge}\n\n`;
            markdown += `- **时间**: ${task.startTime} - ${task.endTime}\n`;
            markdown += `- **优先级**: ${task.priority}\n`;
            
            if (task.description) {
                markdown += `- **备注**: ${task.description}\n`;
            }
            
            markdown += '\n';
        });
        
        markdown += '---\n\n';
    });
    
    const dataBlob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `work-scheduler-${formatDateForFilename(new Date())}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

/**
 * 按日期排序任务
 * @param {Array} tasks - 任务列表
 * @returns {Array} 排序后的任务列表
 */
function sortTasksByDate(tasks) {
    return [...tasks].sort((a, b) => {
        if (a.date !== b.date) {
            return a.date.localeCompare(b.date);
        }
        return a.startTime.localeCompare(b.startTime);
    });
}

/**
 * 按日期分组任务
 * @param {Array} tasks - 任务列表
 * @returns {Object} 按日期分组的任务对象
 */
function groupTasksByDate(tasks) {
    const grouped = {};
    
    tasks.forEach(task => {
        if (!grouped[task.date]) {
            grouped[task.date] = [];
        }
        grouped[task.date].push(task);
    });
    
    return grouped;
}

/**
 * 格式化日期显示
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];
    
    return `${year}年${month}月${day}日 ${weekday}`;
}

/**
 * 格式化日期用于文件名
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
function formatDateForFilename(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}`;
}

/**
 * 获取优先级对应的 emoji
 * @param {string} priority - 优先级
 * @returns {string} emoji
 */
function getPriorityEmoji(priority) {
    const emojiMap = {
        'P1': '🔴',
        'P2': '🟡',
        'P3': '🟢'
    };
    return emojiMap[priority] || '⚪';
}

