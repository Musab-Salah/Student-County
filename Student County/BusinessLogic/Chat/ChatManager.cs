using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public class DestinationManager : IDestinationManager
    {
        protected readonly StudentCountyContext _context;
        public DestinationManager(StudentCountyContext context)
        {
            _context = context;
        }
        public List<ChatEntity> GetAll() => _context.Chats.Where(entity => !entity.IsDeleted).ToList();
        
        public void Delete(int id)
        {
            var entity = _context.Chats.FirstOrDefault(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Chat Not Found");
           else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                _context.SaveChanges();
                throw new Exception("Chat Is Deleted");
            }
        }
        public ChatEntity GetChat(int id)
        {
            var entity = _context.Chats.FirstOrDefault(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Chat Not Found");
            else if(entity.IsDeleted)
                throw new Exception("Chat Is Deleted");
            return entity;
        }
        public ChatEntity CreateUpdate(DestinationBo bo, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
                _context.Add(entity);
           else if (id != 0)
                _context.Update(entity);
            _context.SaveChanges();
            return entity;
        }
    }
}
