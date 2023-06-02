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


        public async Task<List<RoomEntity>> GetMyAllChats(string userid) => await _context.Rooms.Where(entity =>  entity.From == userid || entity.To == userid)
            .Where(entity => entity.DeletedFromFirstUser != userid && entity.DeletedFromSecondUser != userid)
            .OrderByDescending(x => x.CreatedOnLastMessage).ToListAsync();

        public async Task Delete(string userId, string roomId)
        {
            var room = await _context.Rooms.FirstOrDefaultAsync(entity => entity.Id == roomId);
            if (room == null)
                throw new Exception("Room Not Found");
            else if (room.DeletedFromFirstUser is  null)
            {
                room.DeletedFromFirstUser = userId;
                _context.Update(room);
            }
            else if (room.DeletedFromSecondUser is  null)
            {
                room.DeletedFromSecondUser = userId;
                _context.Update(room);
            }
            await _context.SaveChangesAsync();
        }

    }
}
