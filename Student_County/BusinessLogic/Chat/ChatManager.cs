using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public class ChatManager : IChatManager
    {
        protected readonly StudentCountyContext _context;
        public ChatManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<ChatEntity>> GetAll() => await _context.Chats.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<ChatEntity> Delete(int id)
        {
            var entity = await _context.Chats.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Chat Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
                throw new Exception("Chat Is Deleted");
            }
            return entity;
        }
        public async Task<ChatEntity> GetChat(int id)
        {
            var entity = await _context.Chats.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Chat Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Chat Is Deleted");
            return entity;
        }
        public async Task<ChatEntity> CreateUpdate(ChatBo bo, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
                _context.Add(entity);
            else if (id != 0)
                _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
